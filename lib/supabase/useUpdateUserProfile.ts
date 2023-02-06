import { useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useUpdateUserProfile = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const updateUserProfile = useCallback(
    async ({ username }: { username: string }) => {
      if (!user) {
        return;
      }
      const { error } = await supabaseClient
        .from("profiles")
        .update({ username })
        .eq("user_id", user.id);
      return { error };
    },
    [supabaseClient, user]
  );
  return updateUserProfile;
};

export default useUpdateUserProfile;
