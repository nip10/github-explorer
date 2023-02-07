import { useState } from "react";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  createBrowserSupabaseClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { myTheme } from "@/styles/theme";
import GlobalStyles from "@/styles/global";
import { UserProvider } from "@/context/UserContext";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            // retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            // data is fairly static, so we can cache it for a long time
            // cacheTime must be more than staleTime
            staleTime: 60 * (60 * 1000), // 60 minutes
            cacheTime: 90 * (60 * 1000), // 90 mins
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ThemeProvider theme={myTheme}>
          <GlobalStyles />
          <Head>
            <meta name="description" content="Explore GitHub repositories" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <UserProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </UserProvider>
        </ThemeProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
