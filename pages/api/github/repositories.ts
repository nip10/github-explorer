import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import crypto from "crypto";

// TODO: Consider adding personal token
const octokit = new Octokit();

const generateRandomString = (length: number = 16): string => {
  return crypto.randomBytes(length).toString("hex");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { language } = query;
  const { data: repositories } = await octokit.rest.search.repos({
    q: `language:${language} stars:>10000 license:mit`,
    per_page: 10,
    page: 1,
    sort: "stars",
    order: "desc",
  });
  const transformedData = {
    totalCount: repositories.total_count,
    items: repositories.items.map((item) => ({
      repoName: item.name,
      repoOwner: item.owner?.login,
      fullName: item.full_name,
      image: `https://opengraph.githubassets.com/${generateRandomString()}/${
        item.full_name
      }`,
      url: item.html_url,
    })),
  };
  return res.status(200).json({ repositories: transformedData });
}
