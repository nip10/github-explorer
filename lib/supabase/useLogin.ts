import { useCallback } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useLogin = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    },
    [supabaseClient]
  );
  return login;
};

export default useLogin;
