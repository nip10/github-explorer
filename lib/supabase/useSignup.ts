import { useCallback } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useSignup = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const signup = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      return { error };
    },
    [supabaseClient]
  );
  return signup;
};

export default useSignup;
