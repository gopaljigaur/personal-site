import Link from 'next/link';
import socialMdx from '../.contentlayer/generated/Metadata/metadata__social.mdx.json';

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
      <div className="w-full grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">About</a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/dashboard">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">Dashboard</a>
          </Link>
          <Link href="/projects">
            <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition">Projects</a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href={socialMdx.github}>GitHub</ExternalLink>
          <ExternalLink href={socialMdx.linkedin}>LinkedIn</ExternalLink>
        </div>
      </div>
    </footer>
  );
}
