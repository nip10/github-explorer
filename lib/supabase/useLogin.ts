import { useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useLogin = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!user) {
        return;
      }
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    },
    [supabaseClient, user]
  );
  return login;
};

export default useLogin;
