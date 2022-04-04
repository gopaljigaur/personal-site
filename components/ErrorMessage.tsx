import { ErrorIcon } from './SvgIcons';

export default function ErrorMessage({ children }) {
  return (
    <p className="flex items-center text-sm font-bold text-red-800 dark:text-red-400">
      <ErrorIcon className="mr-2 h-4 w-4" />
      {children}
    </p>
  );
}
