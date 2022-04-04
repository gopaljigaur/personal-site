import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import metaMdx from '../../.contentlayer/generated/Metadata/metadata__meta.mdx.json';

export default function AnalyticsCard() {
  const { data, error } = useSWR<Views>('/api/views', fetcher);
  const pageViews = Number(data?.total);
  const link = metaMdx.site_url;

  return (
    <MetricCard
      header="All-Time Views"
      link={link}
      metric={pageViews}
      error={error?.message}
    />
  );
}
