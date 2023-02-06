import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Center } from "@/components/ui/Shared";
import SignupForm from "@/components/SignupForm";

const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Signup - GitHub Explorer</title>
      </Head>
      <Center>
        <SignupForm />
        <h4>
          Already have an account ?{" "}
          <Link href="/auth/login">Click here to login</Link>
        </h4>
      </Center>
    </>
  );
};

export default SignupPage;
