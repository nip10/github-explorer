import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";

const useBookmarks = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [bookmarks, setBookmarks] = useState<
    Database["public"]["Tables"]["bookmarks"]["Row"][]
  >([]);

  // Initial load
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) {
        return;
      }
      const { data, error } = await supabaseClient
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id);
      if (!error && data) {
        setBookmarks(data);
      }
    };
    fetchBookmarks();
  }, [supabaseClient, user]);

  // Listen for changes
  useEffect(() => {
    const bookmarksListener = supabaseClient
      .channel("db-bookmarks")
      .on<Database["public"]["Tables"]["bookmarks"]["Row"]>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookmarks" },
        (payload) => {
          setBookmarks((prevBookmarks) => [...prevBookmarks, payload.new]);
        }
      )
      .on<Database["public"]["Tables"]["bookmarks"]["Row"]>(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookmarks" },
        (payload) => {
          setBookmarks((prevBookmarks) =>
            prevBookmarks.filter(
              (b) => b.bookmark_id !== payload.old.bookmark_id
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(bookmarksListener);
    };
  }, [supabaseClient]);

  return bookmarks;
};

export default useBookmarks;
