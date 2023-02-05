import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";
import { useCallback } from "react";

const useCreateBookmark = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const createBookmark = useCallback(
    async (
      repoOwner: string,
      repoName: string,
      repoUrl: string,
      repoUrlImage: string
    ) => {
      if (!user) {
        return;
      }
      await supabaseClient.from("bookmarks").insert({
        user_id: user.id,
        repo_owner: repoOwner,
        repo_name: repoName,
        repo_url: repoUrl,
        repo_image_url: repoUrlImage,
      });
    },
    [supabaseClient, user]
  );
  return createBookmark;
};

export default useCreateBookmark;
