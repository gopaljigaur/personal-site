import { CheckIcon } from './SvgIcons';

const TimelineStep = (props) => {
  return (
    <li className="mb-4 ml-2">
      <div className="flex items-center mb-2 text-green-700 dark:text-green-300">
        <span className="sr-only">Check</span>
        { CheckIcon }
        <p className="font-medium text-gray-900 dark:text-gray-100">
          { props.title }
        </p>
      </div>
      <div className="text-gray-700 dark:text-gray-400 ml-6">{ props.children }</div>
    </li>
  );
};

export default TimelineStep;