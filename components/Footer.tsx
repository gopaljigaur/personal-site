import Link from 'next/link';
import { TwitterIcon, LinkedinIcon, GithubIcon, EmailIcon } from 'components/SvgIcons';
import metadata from '../data/metadata.json';
const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full px-8 md:px-0 mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-7">
        <div className="flex flex-col sm:col-span-3 space-y-4 mb-8 items-center sm:items-start">
          <div className="flex gap-8 sm:gap-4">
            <ExternalLink href={metadata.twitter}>
              { TwitterIcon }
            </ExternalLink>
            <ExternalLink href={metadata.linkedin}>
              { LinkedinIcon }
            </ExternalLink>
            <ExternalLink href={metadata.github}>
              { GithubIcon }
            </ExternalLink>
            <ExternalLink href={`mailto:${metadata.email}`}>
              { EmailIcon }
            </ExternalLink>
          </div>
          <div className="hidden sm:block text-gray-500 text-sm pl-2">
            © {metadata.name} {new Date().getFullYear()}
          </div>
        </div>
        <div className="mt-1 flex flex-col sm:col-span-2 space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">About</a>
          </Link>
        </div>
        <div className="mt-1 flex flex-col sm:col-span-2 space-y-4 pb-10 sm:pb-16">
          <Link href="/dashboard">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">Dashboard</a>
          </Link>
          <Link href="/projects">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">Projects</a>
          </Link>
        </div>
        <div className="pb-8 block sm:hidden text-gray-500 text-sm justify-self-center">
          © {new Date().getFullYear()} {metadata.name}
        </div>
      </div>
    </footer>
  );
}
