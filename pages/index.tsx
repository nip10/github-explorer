import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import MyBookmarks from "@/components/MyBookmarks";
import Topics from "@/components/Topics";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Discovery - GitHub Explorer</title>
      </Head>
      {user && <MyBookmarks />}
      <Topics />
    </>
  );
};

export default Home;
