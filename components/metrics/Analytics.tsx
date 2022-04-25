import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import MetricCard from 'components/metrics/Card';
import metadata from 'data/metadata.json';

export default function AnalyticsCard() {
  const { data, error } = useSWR<Views>('/api/all/views', fetcher);
  const pageViews = Number(data?.total);
  const link = metadata.site_url;

  return (
    <MetricCard
      header="All-Time Views"
      link={link}
      metric={pageViews}
      error={error?.message}
    />
  );
}
