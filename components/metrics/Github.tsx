import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { GitHub } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import socialMdx from '../../.contentlayer/generated/Metadata/metadata__social.mdx.json';

export default function GitHubCard() {
  const { data, error } = useSWR<GitHub>('/api/github', fetcher);

  const stars = Number(data?.stars);
  const link = socialMdx.github;

  return (
    <MetricCard
      header="GitHub Stars"
      link={link}
      metric={stars}
      error={error?.message}
    />
  );
}
