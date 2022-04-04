import Link from 'next/link';
import { FollowLink } from './SvgIcons';

const InlineLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return(
      <Link href={href}>
      <a
        className="text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
      >{props.children}
        <FollowLink className="ml-1 h-4 w-4 inline-block" />
      </a>
      </Link>
    );
    }
  else {
    return(
      <a target="_blank" rel="noopener noreferrer"
        {...props}
        className="text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
      >{props.children}
        <FollowLink className="ml-1 h-4 w-4 inline-block" />
      </a>
    )
  }
}

export default InlineLink;