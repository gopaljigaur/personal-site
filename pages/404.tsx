import Link from 'next/link';

import Container from 'components/Container';
import fetcher from 'lib/fetcher';
import useSWR, { useSWRConfig, SWRConfig } from 'swr';
import { FunFact } from 'lib/types';
import { RefreshButton } from 'components/SvgIcons';
import funfact from 'lib/funfact';

export function Fact(){
  const { data } = useSWR<FunFact>('/api/funfact', fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false
  });
  return(
    (data) ?
      <p className="mt-2 self-center text-gray-500 dark:text-gray-300">{data.fact}</p>
      : <>
        <div className="mt-2 w-3/4 self-center animate-pulse h-8 rounded-lg bg-gray-200 dark:bg-gray-700">
          &nbsp;
        </div>
        <div className="sm:hidden mt-4 w-3/4 self-center animate-pulse h-8 rounded-lg bg-gray-200 dark:bg-gray-700">
          &nbsp;
        </div>
      </>
  )
}
export default function NotFound({ fallback }) {
  const { mutate } = useSWRConfig();
  return (
    <SWRConfig value={{fallback}}>
    <Container title="404">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          404 – Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page that you were looking for could not be found. Please check your URL
          and try again. Or you can keep reading and discover some interesting
          facts about computers.
        </p>
        <div className="min-w-full mb-8">
        <div className="flex flex-col justify-center p-8 relative pb-12 italic text-lg font-bold mb-4 border-2 min-h-[6rem] rounded-xl border border-gray-300">
          <button
            onClick={() => {
              mutate('/api/funfact').then(() => {});
            }}
            className="absolute bottom-1 right-1 w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">{ RefreshButton }</button>
          <Fact />
        </div>
        </div>
        <Link href="/">
          <a className="p-2 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white">
            Return Home
          </a>
        </Link>
      </div>
    </Container>
    </SWRConfig>
  );
}

export async function getStaticProps() {
  const fact = await funfact();
  return {
    props: {
      fallback: {
        '/api/funfact': fact
      }
    },
    revalidate: 120
  };
}