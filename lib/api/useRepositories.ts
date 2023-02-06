import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import ky from "ky";

export type RepositorySortBy =
  | "stars"
  | "forks"
  | "updated"
  | "help-wanted-issues";

interface GetRepositoriesRequestParams {
  language: string;
  sortBy: RepositorySortBy;
}

export interface Repository {
  repoName: string;
  repoOwner: string;
  fullName: string;
  image: string;
  url: string;
  bookmarkId?: string;
}

interface GetRepositoriesResponse {
  repositories: {
    totalCount: number;
    items: Repository[];
  };
}

const getRepositories = async (params: GetRepositoriesRequestParams) => {
  const data = await ky("/api/github/repositories", {
    searchParams: { ...params },
  }).json<GetRepositoriesResponse>();
  return data;
};

export default function useRepositories(
  params: GetRepositoriesRequestParams,
  options?: UseQueryOptions<GetRepositoriesResponse, unknown>
) {
  return useQuery(
    ["repositories", params],
    () => getRepositories(params),
    options as any
  );
}
