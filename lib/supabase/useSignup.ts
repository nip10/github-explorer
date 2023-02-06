import { useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useSignup = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const signup = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!user) {
        return;
      }
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      return { error };
    },
    [supabaseClient, user]
  );
  return signup;
};

export default useSignup;
