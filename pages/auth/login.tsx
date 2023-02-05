import type { NextPage } from "next";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "@/components/ui/Button";
import Form, { ErrorMessage, FormLabel } from "@/components/ui/Form";
import Input, { InputGroup } from "@/components/ui/Input";
import { Center } from "@/components/ui/Shared";
import type { Database } from "@/db/types";
import { useState } from "react";
import styled from "styled-components";

const LoginForm = styled(Form)`
  width: 350px;
  margin-bottom: 2rem;
`;

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});

type ValidationSchema = z.infer<typeof schema>;

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const processForm: SubmitHandler<ValidationSchema> = async (formData) => {
    setError(null);
    const { email, password } = formData;
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error creating user", error.message);
        setError("Something went wrong. Please try again later.");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating user", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>Login - GitHub Explorer</title>
      </Head>
      <Center>
        <LoginForm onSubmit={handleSubmit(processForm)}>
          <InputGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              {...register("email", { required: true })}
              name="email"
              type="email"
              id="email"
            />
            {errors.email?.message && <span>{errors.email?.message}</span>}
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              {...register("password", { required: true, minLength: 6 })}
              name="password"
              type="password"
              id="password"
            />
            {errors.password?.message && (
              <span>{errors.password?.message}</span>
            )}
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button disabled={isSubmitting}>Submit</Button>
        </LoginForm>
        <h4>
          Don&apos;t have an account ?
          <Link href="/auth/signup">Click here to sign up</Link>
        </h4>
      </Center>
    </>
  );
};

export default LoginPage;
