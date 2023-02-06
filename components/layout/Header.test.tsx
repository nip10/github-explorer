import { cleanup, render, screen } from "@testing-library/react";
import { myTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import Header from "./Header";
import { UserProvider } from "@/context/UserContext";

jest.mock("next/router", () => require("next-router-mock"));

let mockIsLoggedIn = false;
jest.mock("@supabase/auth-helpers-react", () => {
  // const originalModule = jest.requireActual("@supabase/auth-helpers-react");
  return {
    // __esModule: true,
    // ...originalModule,
    // default: () => ({
    //   useUser: () =>
    //     mockIsLoggedIn ? { user: { email: "test@mail.com" } } : null,
    // }),
    useUser: () =>
      mockIsLoggedIn ? { user: { email: "test@mail.com" } } : null,
    auth: {
      signOut: jest.fn(),
    },
    useSupabaseClient: jest.fn(
      () =>
        ({
          auth: {
            signOut: jest.fn(),
          },
          from: jest.fn(),
        } as any)
    ),
  };
});

jest.mock("../../lib/supabase/useUserProfile", () => {
  return {
    __esModule: true,
    default: () =>
      jest.fn(() => ({
        data: {
          id: "1",
          username: "test",
        },
        error: null,
      })),
  };
});

afterEach(cleanup);

describe("Header", () => {
  it("should render un-authenticated Header corretly", () => {
    render(
      <ThemeProvider theme={myTheme}>
        <UserProvider>
          <Header />
        </UserProvider>
      </ThemeProvider>
    );

    const loginButton = screen.getByRole("link", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    const logoutButton = screen.queryByRole("button", { name: /logout/i });
    expect(logoutButton).toBeNull();
  });
  it("should render authenticated Header corretly", () => {
    mockIsLoggedIn = true;

    render(
      <ThemeProvider theme={myTheme}>
        <UserProvider>
          <Header />
        </UserProvider>
      </ThemeProvider>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
    const loginButton = screen.queryByRole("link", { name: /login/i });
    expect(loginButton).toBeNull();
  });
});
