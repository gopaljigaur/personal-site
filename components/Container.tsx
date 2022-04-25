import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Footer from 'components/Footer';
import MobileMenu from 'components/MobileMenu';
import { MoonIcon, ScrollTopButton, SunIcon } from './SvgIcons';
import metadata from 'data/metadata.json';
function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-semibold text-gray-800 dark:text-gray-200'
            : 'font-normal text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [showBorder, setShowBorder] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if(mounted) {
      if (window.scrollY > 8) {
          setShowBorder(true);
      }
      if (window.scrollY > 400) {
          setShowScrollTop(true);
      }
      window.addEventListener("scroll", () => {
        if (window.scrollY > 8) {
          setShowBorder(true);
        } else {
          setShowBorder(false);
        }
        if (window.scrollY > 400) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      });
    }
  }, [mounted]);
  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
    }, []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: metadata.meta_title,
    description: metadata.meta_description,
    image: metadata.meta_image,
    type: 'website',
    ...customMeta
  };

  if(meta.title != metadata.meta_title) {
    meta.title += ` – ${ metadata.name }`;
  }
  return (
    <div className="flex flex-col h-screen">
      <NextSeo
        title={meta.title}
        description={meta.description}
        canonical={`${metadata.site_url}${router.asPath}`}
        openGraph={{
          url: `${metadata.site_url}${router.asPath}`,
          title: meta.title,
          description: meta.description,
          site_name: metadata.meta_title,
          images: [
            {
              url: meta.image,
              alt: meta.description
            }
          ]
        }}
        twitter={{
          handle: metadata.meta_twitter,
          site: metadata.meta_twitter,
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <title>{meta.title}</title>
        {
          resolvedTheme ? (
            <>
            <link href={`/static/favicons/${resolvedTheme}/favicon.ico`} rel="shortcut icon" />
            <link href={`/static/favicons/${resolvedTheme}/site.webmanifest`} rel="manifest" />
            <link rel="apple-touch-icon" sizes="57x57" href={`/static/favicons/${resolvedTheme}/apple-icon-57x57.png`} />
            <link rel="apple-touch-icon" sizes="60x60" href={`/static/favicons/${resolvedTheme}/apple-icon-60x60.png`} />
            <link rel="apple-touch-icon" sizes="72x72" href={`/static/favicons/${resolvedTheme}/apple-icon-72x72.png`} />
            <link rel="apple-touch-icon" sizes="76x76" href={`/static/favicons/${resolvedTheme}/apple-icon-76x76.png`} />
            <link rel="apple-touch-icon" sizes="114x114" href={`/static/favicons/${resolvedTheme}/apple-icon-114x114.png`} />
            <link rel="apple-touch-icon" sizes="120x120" href={`/static/favicons/${resolvedTheme}/apple-icon-120x120.png`} />
            <link rel="apple-touch-icon" sizes="144x144" href={`/static/favicons/${resolvedTheme}/apple-icon-144x144.png`} />
            <link rel="apple-touch-icon" sizes="152x152" href={`/static/favicons/${resolvedTheme}/apple-icon-152x152.png`} />
            <link rel="apple-touch-icon" sizes="180x180" href={`/static/favicons/${resolvedTheme}/apple-icon-180x180.png`} />
            <link rel="icon" type="image/png" sizes="192x192"  href={`/static/favicons/${resolvedTheme}/android-icon-192x192.png`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`/static/favicons/${resolvedTheme}/favicon-32x32.png`} />
            <link rel="icon" type="image/png" sizes="96x96" href={`/static/favicons/${resolvedTheme}/favicon-96x96.png`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`/static/favicons/${resolvedTheme}/favicon-16x16.png`} />
            <meta name="msapplication-TileColor" content={resolvedTheme === 'dark' ? '#000000' : '#ffffff'} />
            <meta name="msapplication-TileImage" content={`/static/favicons/${resolvedTheme}/ms-icon-144x144.png`} />
            <meta name="theme-color" content={resolvedTheme === 'dark' ? '#000000' : '#ffffff'} />
            </>
          ) : (
            <>
              <link href={`/static/favicons/light/favicon.ico`} rel="shortcut icon" />
              <link href={`/static/favicons/light/site.webmanifest`} rel="manifest" />
              <link rel="apple-touch-icon" sizes="57x57" href={`/static/favicons/light/apple-icon-57x57.png`} />
              <link rel="apple-touch-icon" sizes="60x60" href={`/static/favicons/light/apple-icon-60x60.png`} />
              <link rel="apple-touch-icon" sizes="72x72" href={`/static/favicons/light/apple-icon-72x72.png`} />
              <link rel="apple-touch-icon" sizes="76x76" href={`/static/favicons/light/apple-icon-76x76.png`} />
              <link rel="apple-touch-icon" sizes="114x114" href={`/static/favicons/light/apple-icon-114x114.png`} />
              <link rel="apple-touch-icon" sizes="120x120" href={`/static/favicons/light/apple-icon-120x120.png`} />
              <link rel="apple-touch-icon" sizes="144x144" href={`/static/favicons/light/apple-icon-144x144.png`} />
              <link rel="apple-touch-icon" sizes="152x152" href={`/static/favicons/light/apple-icon-152x152.png`} />
              <link rel="apple-touch-icon" sizes="180x180" href={`/static/favicons/light/apple-icon-180x180.png`} />
              <link rel="icon" type="image/png" sizes="192x192"  href={`/static/favicons/light/android-icon-192x192.png`} />
              <link rel="icon" type="image/png" sizes="32x32" href={`/static/favicons/light/favicon-32x32.png`} />
              <link rel="icon" type="image/png" sizes="96x96" href={`/static/favicons/light/favicon-96x96.png`} />
              <link rel="icon" type="image/png" sizes="16x16" href={`/static/favicons/light/favicon-16x16.png`} />
              <meta name="msapplication-TileColor" content="#ffffff" />
              <meta name="msapplication-TileImage" content={`/static/favicons/light/ms-icon-144x144.png`} />
              <meta name="theme-color" content="#ffffff" />
            </>
          )
        }
      </Head>
      <div className="flex flex-col justify-center fixed w-full backdrop-blur-md z-20 px-8 bg-gray-50 dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-50 firefox:bg-opacity-100 dark:firefox:bg-opacity-100 transition-[backdrop-filter]">
        <nav className={cn(showBorder ? "border-solid border-b" : "",
          "flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-9 sm:pt-10 sm:pb-12 text-gray-900 dark:text-gray-100")}>
          <div className="md:ml-[-0.60rem]">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/dashboard" text="Dashboard" />
            <NavItem href="/projects" text="Projects" />
            <NavItem href="/about" text="About" />
            <NavItem href="/timeline" text="Timeline" />
            <NavItem href="/contact" text="Contact" />
          </div>
          <div className="flex gap-4">
            <button
              aria-label="Scroll to Top"
              title="Scroll to Top"
              type="button"
              disabled={!showScrollTop}
              className={cn("w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all",
                showScrollTop ? "opacity-100" : "opacity-0")}
              onClick={() =>
                window.scrollTo(0, 0)
              }
            >
              {ScrollTopButton}
            </button>
          <button
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
            type="button"
            className="z-50 w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
            onClick={() => {
              if(resolvedTheme === 'dark') {
                // @ts-ignore
                if (window.REMARK42)
                  // @ts-ignore
                  window.REMARK42.changeTheme('light');
                setTheme('light');
              }
              else {
                // @ts-ignore
                if (window.REMARK42)
                  // @ts-ignore
                  window.REMARK42.changeTheme('dark');
                setTheme('dark');
              }
            }
            }
          >
            {mounted &&
                resolvedTheme === 'dark' ? SunIcon : MoonIcon
            }
          </button>
          </div>
        </nav>
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900 mb-auto mt-28 sm:mt-32"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}