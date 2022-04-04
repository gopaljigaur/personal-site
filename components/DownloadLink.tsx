import Link from 'next/link';
import { DownloadIcon } from './SvgIcons';

const DownloadLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return(
      <Link href={href}>
        <a
          className="text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
          download
          target="_blank"
        >{props.children}
          <DownloadIcon className="h-4 w-4 inline-block" />
        </a>
      </Link>
    );
  }
  else {
    return(
      <a
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
        {...props}
        download
        target="_blank"
      >{props.children}
        <DownloadIcon className="h-4 w-4 inline-block" />
      </a>
    )
  }
}

export default DownloadLink;