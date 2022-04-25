import Analytics from 'components/metrics/Analytics';
import Container from 'components/Container';
import GitHub from 'components/metrics/Github';
import totalViews from 'lib/totalViews';
import githubStats from 'lib/githubStats';
import { SWRConfig } from 'swr';
import { Views, GitHubStats } from 'lib/types';

export default function Dashboard({fallback}) {
  return (
    <SWRConfig value={{ fallback }}>
    <Container
      title="Dashboard"
      description="My personal dashboard, built with Next.js API routes deployed as serverless functions."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Dashboard
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is my personal dashboard, built with Next.js API routes
            deployed as serverless functions.
          </p>
        </div>
        <div className="flex flex-col w-full">
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
            <Analytics />
            <GitHub />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        </div>
      </div>
    </Container>
</SWRConfig>
  );
}
export async function getStaticProps () {
  let analytics: Views;
  let github: GitHubStats;
  try {
    analytics = await totalViews('all');
  }
  catch(e) {
    analytics = {
      total: -1
    };
  }
  try {
    github = await githubStats();
  }
    catch(e) {
      github = {
        stars: -1,
        followers: -1
      };
    }
  return {
    props: {
      fallback: {
        '/api/all/views': analytics,
        '/api/github': github
      }
    },
    revalidate: 60
  }
}