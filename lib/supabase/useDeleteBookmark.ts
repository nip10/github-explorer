import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";
import { useCallback } from "react";

const useDeleteBookmark = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const createBookmark = useCallback(
    async (bookmarkId: string) => {
      if (!user) {
        return;
      }
      await supabaseClient
        .from("bookmarks")
        .delete()
        .eq("bookmark_id", bookmarkId);
    },
    [supabaseClient, user]
  );
  return createBookmark;
};

export default useDeleteBookmark;
