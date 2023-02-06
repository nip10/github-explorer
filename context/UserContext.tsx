import React, { createContext, useCallback, useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

type UserContextType = {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
  updateProfile: () => Promise<void>;
  clearProfile: () => void;
};

const UserContext = createContext<UserContextType>({
  profile: null,
  updateProfile: () => Promise.resolve(),
  clearProfile: () => {},
});

const UserProvider = ({ children }: React.PropsWithChildren) => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [profile, setProfile] = useState<UserContextType["profile"]>(null);

  const updateProfile = useCallback(async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (error) {
      console.error(error);
      return;
    }
    setProfile(data);
  }, [supabaseClient, user]);

  useEffect(() => {
    if (!profile) {
      void updateProfile();
    }
  }, [profile, updateProfile]);

  const clearProfile = () => setProfile(null);

  const value = { profile, updateProfile, clearProfile };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUserProfileContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserProfileContext };
