import { cleanup, render, screen } from "@testing-library/react";
// import user from "@testing-library/user-event";
import { myTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import LoginForm from "@/components/LoginForm";

jest.mock("next/router", () => require("next-router-mock"));

afterEach(cleanup);

describe("Login", () => {
  it("should render Login form correctly", () => {
    render(
      <ThemeProvider theme={myTheme}>
        <LoginForm />
      </ThemeProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    // user.type(emailInput, "test@mail.com");

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    // user.type(passwordInput, "password");

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    // user.click(loginButton);

    // check that it redirect to home page
    // expect(window.location.pathname).toBe("/");
  });
});
