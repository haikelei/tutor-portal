import { format } from 'date-fns';

const PageHeader = () => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0 mb-2">
        Lesson Dashboard
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {format(new Date(), 'EEEE, MMMM dd, yyyy')}
      </p>
    </div>
  );
};

export default PageHeader;

