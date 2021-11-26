import type {AppProps} from 'next/app'
import { Layout } from 'components';
import Head from 'next/head';
import { ReactNode } from 'react';
import ThemeProvider from "styles";
import { GlobalStyle } from "styles/globals";
import { NextPage } from 'next';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return getLayout(
    <>
        <Head>
          <title>Disguisefy</title>
          <link rel="stylesheet" href="https://use.typekit.net/ukf1mgq.css" />
          <link rel="icon" type="image/png" href="/disguisefy_favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          {
            process.env.NEXT_PUBLIC_ENV == 'prod' && 
            <script defer data-domain="disguisefy.xyz" src="https://plausible.io/js/plausible.js"></script>
          }
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
