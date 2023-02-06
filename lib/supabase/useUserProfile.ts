import { useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useUserProfile = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const userProfile = useCallback(async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    return { data, error };
  }, [supabaseClient, user]);
  return userProfile;
};

export default useUserProfile;
