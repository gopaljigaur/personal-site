import Link from 'next/link';
import Image from 'next/image';

import ProsCard from 'components/ProsCard';
import ConsCard from 'components/ConsCard';
import Step from 'components/Step';
import ImageWithTheme from 'components/ImageWithTheme';
import InlineLink from 'components/InlineLink';
import DownloadLink from 'components/DownloadLink';
import TimelineStep from './TimelineStep';

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg bg-gray-200 dark:bg-gray-800" {...props} />;
}

const MDXComponents = {
  Image: RoundedImage,
  ImageWithTheme,
  a: CustomLink,
  InlineLink,
  DownloadLink,
  ConsCard,
  ProsCard,
  Step,
  TimelineStep
};

export default MDXComponents;
