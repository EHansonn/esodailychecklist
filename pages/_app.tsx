import { SessionProvider } from "next-auth/react";
import "../styles/./styles.css";
import "../styles/./globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { useEffect } from "react";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Head from "next/head";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  useEffect(() => {
    Router.events.on("routeChangeStart", NProgress.start);
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);
  return (
    <SessionProvider session={session}>
      
      <Component {...pageProps} />
    </SessionProvider>
  );
}
