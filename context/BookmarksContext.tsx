import { Database } from "@/db/types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { createContext, useEffect, useState } from "react";

type BookmarksContextType = {
  bookmarks: Database["public"]["Tables"]["bookmarks"]["Row"][];
  clearBookmarks: () => void;
};

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: [],
  clearBookmarks: () => {},
});

const BookmarksProvider = ({ children }: React.PropsWithChildren) => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [bookmarks, setBookmarks] = useState<BookmarksContextType["bookmarks"]>(
    []
  );

  const addBookmark = (
    bookmark: Database["public"]["Tables"]["bookmarks"]["Row"]
  ) => setBookmarks((prev) => [...prev, bookmark]);

  const removeBookmark = (
    bookmarkId: Database["public"]["Tables"]["bookmarks"]["Row"]["bookmark_id"]
  ) =>
    setBookmarks((prev) =>
      prev.filter((bookmark) => bookmark.bookmark_id !== bookmarkId)
    );

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
          addBookmark(payload.new);
        }
      )
      .on<Database["public"]["Tables"]["bookmarks"]["Row"]>(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookmarks" },
        (payload) => {
          removeBookmark(payload.old.bookmark_id!);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(bookmarksListener);
    };
  }, [supabaseClient]);

  const clearBookmarks = () => setBookmarks([]);

  const value = { bookmarks, clearBookmarks };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};

function useBookmarksContext() {
  const context = React.useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error(
      "useBookmarksProfile must be used within a BookmarksProvider"
    );
  }
  return context;
}

export { BookmarksProvider, useBookmarksContext };
