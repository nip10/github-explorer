import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useUserProfile = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [profile, setProfile] = useState<
    Database["public"]["Tables"]["profiles"]["Row"] | null
  >(null);
  useEffect(() => {
    const fetchProfile = async () => {
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
    };
    fetchProfile();
  }, [supabaseClient, user]);

  return profile;
};

export default useUserProfile;
