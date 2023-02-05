import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Button from "@/components/ui/Button";
import Form, { ErrorMessage, FormLabel } from "@/components/ui/Form";
import Input, { InputGroup } from "@/components/ui/Input";
import type { Database } from "@/db/types";
import { Section } from "@/components/ui/Shared";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().min(6).optional(),
  password: z.string().min(6).optional(),
});

type ValidationSchema = z.infer<typeof schema>;

const MyAccount = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [error, setError] = useState<string | null>(null);

  const processForm: SubmitHandler<ValidationSchema> = async (formData) => {
    if (!user) return;
    setError(null);
    const { email, password, username } = formData;
    const authDataToUpdate: { email?: string; password?: string } = {};
    const shouldUpdateAuthData = email || password;
    if (email) authDataToUpdate["email"] = email;
    if (password) authDataToUpdate["password"] = password;
    try {
      // Update user auth data
      if (shouldUpdateAuthData) {
        const { error: authDataError } = await supabaseClient.auth.updateUser(
          authDataToUpdate
        );
        if (authDataError) {
          console.log("Error updating user auth data", authDataError);
          setError("Something went wrong. Please try again later.");
          return;
        }
        // TODO: Force update user token
      }
      // Update user profile
      const { error: profileDataError } = await supabaseClient
        .from("profiles")
        .update({ username })
        .eq("id", user.id);
      if (profileDataError) {
        console.log("Error updating user profile", profileDataError);
        setError("Something went wrong. Please try again later.");
        return;
      }
      reset({ email: "", password: "" });
    } catch (error) {
      console.log("Error updating user data", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>My Account - GitHub Explorer</title>
      </Head>
      <Section>
        <h2>My account</h2>
        <Form onSubmit={handleSubmit(processForm)}>
          <InputGroup>
            <FormLabel htmlFor="username">Username *</FormLabel>
            <Input
              {...register("username", { required: true, minLength: 3 })}
              name="username"
              type="text"
              id="username"
            />
            {errors.username?.message && (
              <ErrorMessage>{errors.username?.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              {...register("email", { required: false, minLength: 6 })}
              name="email"
              type="email"
              id="email"
            />
            {errors.email?.message && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              {...register("password", { required: false, minLength: 6 })}
              name="password"
              type="password"
              id="password"
            />
            {errors.password?.message && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button disabled={isSubmitting}>Submit</Button>
        </Form>
      </Section>
    </>
  );
};

export default MyAccount;
