import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import crypto from "crypto";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/db/types";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const repositorySortBy = [
  "stars",
  "forks",
  "updated",
  "help-wanted-issues",
] as const;
type RepositorySortBy = typeof repositorySortBy[number];

const generateRandomString = (length: number = 16): string => {
  return crypto.randomBytes(length).toString("hex");
};

// Simple in-memory cache for the OG images (force update after 1 day old)
const imgCache = new Map<string, { url: string; updatedAt: Date }>();
const getOpenGraphImageUrl = (repoFullName: string): string => {
  if (imgCache.has(repoFullName)) {
    // Check if the image is older than 1 day
    const updatedAt = imgCache.get(repoFullName)!.updatedAt;
    const diff = new Date().getTime() - updatedAt.getTime();
    if (diff < 1000 * 60 * 60 * 24) {
      // Return the cached image
      return imgCache.get(repoFullName)!.url;
    }
  }
  // Generate a new image
  const img = `https://opengraph.githubassets.com/${generateRandomString()}/${repoFullName}`;
  imgCache.set(repoFullName, { url: img, updatedAt: new Date() });
  return img;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { language, sortBy } = query;
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient<Database>({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!language) {
    return res.status(400).json({ error: "Language is required" });
  }
  if (sortBy && !repositorySortBy.includes(sortBy as RepositorySortBy)) {
    return res.status(400).json({ error: "Invalid sort by value" });
  }
  const { data: repositories } = await octokit.rest.search.repos({
    q: `language:${language as string} stars:>10000 license:mit`,
    per_page: 10,
    page: 1,
    sort: (sortBy as RepositorySortBy | undefined) ?? "stars",
    order: "desc",
  });
  let bookmarks: { bookmarkId: string; repoFullName: string }[] = [];
  if (session) {
    const { data: bookmarksData } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", session.user.id);
    if (bookmarksData) {
      bookmarks = bookmarksData.map((bookmark) => ({
        bookmarkId: bookmark.bookmark_id,
        repoFullName: `${bookmark.repo_owner}/${bookmark.repo_name}`,
      }));
    }
  }
  const transformedData = {
    totalCount: repositories.total_count,
    items: repositories.items.map((item) => ({
      repoName: item.name,
      repoOwner: item.owner?.login,
      fullName: item.full_name,
      image: getOpenGraphImageUrl(item.full_name),
      url: item.html_url,
      bookmarkId: bookmarks.find(
        (bookmark) => bookmark.repoFullName === item.full_name
      )?.bookmarkId,
    })),
  };
  return res.status(200).json({ repositories: transformedData });
}
