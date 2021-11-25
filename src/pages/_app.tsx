import { Layout } from 'components';
import Head from 'next/head';
import ThemeProvider from "styles";
import { GlobalStyle } from "styles/globals";

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <ThemeProvider>
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
