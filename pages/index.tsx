import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import MyBookmarks from "@/components/MyBookmarks";
import Topics from "@/components/Topics";
import { BookmarksProvider } from "@/context/BookmarksContext";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Discovery - GitHub Explorer</title>
      </Head>
      <BookmarksProvider>
        {user && <MyBookmarks />}
        <Topics />
      </BookmarksProvider>
    </>
  );
};

export default Home;
