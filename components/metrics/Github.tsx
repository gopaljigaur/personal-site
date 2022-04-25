import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { GitHubStats } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import metadata from 'data/metadata.json';

export default function GitHubCard() {
  const { data, error } = useSWR<GitHubStats>('/api/github', fetcher);

  const stars = Number(data.stars);
  const link = metadata.github;

  return (
    <MetricCard
      header="GitHub Stars"
      link={link}
      metric={stars}
      error={error?.message}
    />
  );
}
