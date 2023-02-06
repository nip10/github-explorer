import { cleanup, render, screen } from "@testing-library/react";
// import user from "@testing-library/user-event";
import { myTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import SignupForm from "@/components/SignupForm";

jest.mock("next/router", () => require("next-router-mock"));

afterEach(cleanup);

describe("Signup", () => {
  it("should render Signup form correctly", () => {
    render(
      <ThemeProvider theme={myTheme}>
        <SignupForm />
      </ThemeProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    // user.type(emailInput, "test@mail.com");

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    // user.type(passwordInput, "password");

    const signupButton = screen.getByRole("button", { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();
    // user.click(signupButton);

    // check that it redirect to home page
    // expect(window.location.pathname).toBe("/");
  });
});
