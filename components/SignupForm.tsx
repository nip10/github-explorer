import useSignup from "@/lib/supabase/useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import Button from "./ui/Button";
import Form, { FormLabel, ErrorMessage } from "./ui/Form";
import Input, { InputGroup } from "./ui/Input";

const StyledForm = styled(Form)`
  width: 350px;
  margin-bottom: 2rem;
`;

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});

type ValidationSchema = z.infer<typeof schema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });
  const signup = useSignup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const processForm: SubmitHandler<ValidationSchema> = async (formData) => {
    setError(null);
    const { email, password } = formData;
    try {
      const signupResult = await signup({
        email,
        password,
      });
      if (signupResult?.error) {
        console.error("Error creating user", signupResult.error.message);
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
    <StyledForm onSubmit={handleSubmit(processForm)}>
      <InputGroup>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          {...register("email", { required: true })}
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
          {...register("password", { required: true, minLength: 6 })}
          name="password"
          type="password"
          id="password"
        />
        {errors.password?.message && (
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        )}
      </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button disabled={isSubmitting}>Sign up</Button>
    </StyledForm>
  );
};

export default SignupForm;
