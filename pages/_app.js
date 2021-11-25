import Head from 'next/head'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import "@progress/kendo-theme-material/dist/all.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add the favicon */}
      <Head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="description" content="Imprecion del catalogo de productos de sublicenter"/>
        <meta name="keywords" content="catalogo, sublicenter, catalogo PDF, catalogo de productos de sublicenter, productos sublicenter"/>
        <meta name="author" content="Sublicenter" />
      </Head>
      {/* Add the favicon */}
      {/* Note that the path doesn't include "public" */}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
