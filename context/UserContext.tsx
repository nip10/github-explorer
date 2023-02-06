import React, { createContext, useCallback, useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import type { PostgrestError } from "@supabase/supabase-js";
import useUpdateUserProfile from "@/lib/supabase/useUpdateUserProfile";
import type { Database } from "@/db/types";
import useUserProfile from "@/lib/supabase/useUserProfile";

type UserContextType = {
  profile: Partial<Database["public"]["Tables"]["profiles"]["Row"]> | null;
  updateProfile: ({
    username,
  }: {
    username: string;
  }) => Promise<{ error: PostgrestError } | undefined>;
  clearProfile: () => void;
};

const UserContext = createContext<UserContextType>({
  profile: null,
  updateProfile: () => Promise.resolve(undefined),
  clearProfile: () => {},
});

const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [profile, setProfile] = useState<UserContextType["profile"]>(null);
  const user = useUser();
  const userProfile = useUserProfile();
  const supabaseUpdateProfile = useUpdateUserProfile();

  const fetchProfile = useCallback(async () => {
    if (!user) {
      return;
    }
    const userProfileResult = await userProfile();
    if (userProfileResult?.data) {
      setProfile(userProfileResult.data);
    }
  }, [user, userProfile]);

  useEffect(() => {
    if (!profile) {
      void fetchProfile();
    }
  }, [profile, fetchProfile]);

  const updateProfile = async ({ username }: { username: string }) => {
    const result = await supabaseUpdateProfile({ username });
    if (result?.error) {
      return { error: result.error };
    } else {
      setProfile((prev) => ({ ...prev, username }));
    }
  };

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
