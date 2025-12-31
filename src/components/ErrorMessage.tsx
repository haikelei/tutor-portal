import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2">
        <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
        <p className="text-red-700 dark:text-red-400">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;

