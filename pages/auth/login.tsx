import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Center } from "@/components/ui/Shared";
import LoginForm from "@/components/LoginForm";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - GitHub Explorer</title>
      </Head>
      <Center>
        <LoginForm />
        <h4>
          Don&apos;t have an account ?
          <Link href="/auth/signup">Click here to sign up</Link>
        </h4>
      </Center>
    </>
  );
};

export default LoginPage;
