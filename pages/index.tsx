import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import MyBookmarks from "@/components/MyBookmarks";
import { BookmarksProvider } from "@/context/BookmarksContext";
import dynamic from "next/dynamic";

const DynamicTopics = dynamic(() => import("../components/Topics"), {
  ssr: false,
});
const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Discovery - GitHub Explorer</title>
      </Head>
      <BookmarksProvider>
        {user && <MyBookmarks />}
        <DynamicTopics />
      </BookmarksProvider>
    </>
  );
};

export default Home;
