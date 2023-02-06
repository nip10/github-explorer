import { useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useUpdateUserAuth = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const updateUserAuth = useCallback(
    async ({ email, password }: { email?: string; password?: string }) => {
      if (!user) {
        return;
      }
      const authDataToUpdate: { email?: string; password?: string } = {};
      if (email) authDataToUpdate["email"] = email;
      if (password) authDataToUpdate["password"] = password;
      const { error } = await supabaseClient.auth.updateUser(authDataToUpdate);
      return { error };
    },
    [supabaseClient, user]
  );
  return updateUserAuth;
};

export default useUpdateUserAuth;
