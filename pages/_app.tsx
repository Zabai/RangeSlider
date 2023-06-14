import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fallback: pageProps?.fallback ?? {},
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
