import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import Button from "@/components/ui/Button";
import Form, {
  ErrorMessage,
  FormLabel,
  InfoMessage,
} from "@/components/ui/Form";
import Input, { InputGroup } from "@/components/ui/Input";
import { Section } from "@/components/ui/Shared";
import { useState } from "react";
import { getDirtyFields } from "@/lib/utils/form";
import { useUserProfileContext } from "@/context/UserContext";
import type { NextPage } from "next";
import useUpdateUserAuth from "@/lib/supabase/useUpdateUserAuth";

const schema = z.object({
  username: z.string().min(3),
  // https://github.com/colinhacks/zod/issues/310#issuecomment-794533682
  email: z.string().optional().or(z.literal("")),
  password: z.string().min(6).optional().or(z.literal("")),
});

type ValidationSchema = z.infer<typeof schema>;

const MyAccount: NextPage = () => {
  const user = useUser();
  const { profile, updateProfile } = useUserProfileContext();
  const updateUserAuth = useUpdateUserAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    values: {
      email: user?.email,
      username: profile?.username ?? "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [showChangeEmailSuccessMessage, setShowChangeEmailSuccessMessage] =
    useState(false);

  const processForm: SubmitHandler<ValidationSchema> = async (formData) => {
    if (!user) return;
    setError(null);
    const dirty = getDirtyFields(dirtyFields, formData) as {
      email?: string;
      password?: string;
      username?: string;
    };
    // Avoid unnecessary requests
    if (Object.keys(dirty).length === 0) return;
    const { email, password, username } = formData;
    const shouldUpdateAuthData = dirty.email || dirty.password;
    try {
      // Update user auth data
      if (shouldUpdateAuthData) {
        const updateUserAuthResult = await updateUserAuth({ email, password });
        if (updateUserAuthResult?.error) {
          setError("Something went wrong. Please try again later.");
          return;
        } else {
          setShowChangeEmailSuccessMessage(true);
          // TODO: It may be required to force update the user's token/jwt on pw change
        }
      }
      // Update user profile
      const updateUserProfileResult = await updateProfile({ username });
      if (updateUserProfileResult?.error) {
        setError("Something went wrong. Please try again later.");
        return;
      }
      reset({ email: "", password: "" });
    } catch (error) {
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
              {...register("email", { required: false })}
              name="email"
              type="email"
              id="email"
            />
            {errors.email?.message && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
          </InputGroup>
          {showChangeEmailSuccessMessage && (
            <InfoMessage>
              You&apos;ll receive an email on both the old and new email
              addresses to confirm the change.
            </InfoMessage>
          )}
          <InputGroup>
            <FormLabel htmlFor="password">New Password</FormLabel>
            <Input
              {...register("password", { required: false })}
              autoComplete="off"
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
