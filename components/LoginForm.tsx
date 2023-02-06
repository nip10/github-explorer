import useLogin from "@/lib/supabase/useLogin";
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

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });
  const login = useLogin();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const processForm: SubmitHandler<ValidationSchema> = async (formData) => {
    setError(null);
    const { email, password } = formData;
    try {
      const loginResult = await login({
        email,
        password,
      });
      if (loginResult?.error) {
        console.error("Error creating user", loginResult.error.message);
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
        {errors.password?.message && <span>{errors.password?.message}</span>}
      </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button disabled={isSubmitting}>Login</Button>
    </StyledForm>
  );
};

export default LoginForm;
