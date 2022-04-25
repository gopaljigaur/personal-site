import { useEffect } from 'react';
import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';

export default function ViewCounter({ slug, type }) {
  const { data } = useSWR<Views>(`/api/${type}/views/${slug}`, fetcher);
  const views = Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/${type}/views/${slug}`, {
        method: 'POST'
      });

    registerView();
  }, [slug, type]);

  return <span>{`${views > 0 ? views.toLocaleString() : '–––'} ${views == 1 ? 'view' : 'views'}`}</span>;
}
