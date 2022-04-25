import { Html, Head, Main, NextScript } from 'next/document';
import metadata from '../data/metadata.json';
export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/ibm-plex-sans-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.gravatar.com"
          crossOrigin=""
        />
        {
          metadata.yandex_verification ?
            (<meta content={metadata.yandex_verification} name="yandex-verification" />)
            : ''
        }
        {
          metadata.google_site_verification ?
            (<meta content={metadata.google_site_verification} name="google-site-verification" />)
            : ''
        }
      </Head>
      <body className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
