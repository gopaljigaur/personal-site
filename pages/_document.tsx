import { Html, Head, Main, NextScript } from 'next/document';
import metaMdx from '../.contentlayer/generated/Metadata/metadata__meta.mdx.json'

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
          metaMdx.yandex_verification ?
            (<meta content={metaMdx.yandex_verification} name="yandex-verification" />)
            : ''
        }
        {
          metaMdx.google_site_verification ?
            (<meta content={metaMdx.google_site_verification} name="google-site-verification" />)
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
