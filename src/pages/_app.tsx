import { Layout } from 'components';
import Head from 'next/head';
import ThemeProvider from "styles";
import { GlobalStyle } from "styles/globals";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Head>
          <title>Disguisefy</title>
          <link rel="stylesheet" href="https://use.typekit.net/ukf1mgq.css" />
          <link rel="icon" type="image/png" href="/disguisefy_favicon.png" />
          <link rel="manifest" href="manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <script defer data-domain="disguisefy.xyz" src="https://plausible.io/js/plausible.js"></script>
        </Head>
        <GlobalStyle />
        <Layout>
          {typeof window === 'undefined' ? null : <Component {...pageProps} />}
          {/* <Component {...pageProps} /> */}
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
