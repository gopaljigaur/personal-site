import { ErrorIcon, FollowLink } from '../SvgIcons';

export default function MetricCard({ header, link, metric,  error }) {
  return (
    <div className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full">
      <a
        aria-label={header}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        <div className="flex items-center text-gray-900 dark:text-gray-100">
          {header}
          <FollowLink className="h-4 w-4 ml-1"/>
        </div>
      </a>
        {
          error ?
            <ErrorIcon className="fill-red-400 dark:fill-red-800 h-8 mt-1.5"/> :
            (
              metric === 0 ? <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">0</p> :
                (
                  metric > 0 ?
                  <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">{metric.toLocaleString()}</p> :
                    <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">-</p>
                )
            )
        }
    </div>
  );
}
