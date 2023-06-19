import Head from "next/head";
import { PropsWithChildren } from "react";
import { Navigation } from "../../features/Navigation/Navigation";

interface Props extends PropsWithChildren {
  title: string;
}

export function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navigation />
      {children}
    </>
  );
}
