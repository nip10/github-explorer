import { useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useLogout = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const logout = useCallback(async () => {
    if (!user) {
      return;
    }
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  }, [supabaseClient, user]);
  return logout;
};

export default useLogout;
