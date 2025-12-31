import { Lesson } from '../types';
import { format } from 'date-fns';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

interface LessonCardProps {
  lesson: Lesson;
  onTakeClass?: (lessonId: string) => void;
}

const LessonCard = ({ lesson, onTakeClass }: LessonCardProps) => {
  const lessonDate = new Date(lesson.date);
  const isAvailable = lesson.status === 'Available';

  const getStatusStyles = () => {
    switch (lesson.status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'Confirmed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Available':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="card h-full hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-2 flex-1">
              <BookOpenIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                {lesson.subject}
              </h3>
            </div>
          </div>

          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}
            >
              {lesson.status === 'Completed' && (
                <CheckCircleIconSolid className="w-3.5 h-3.5" />
              )}
              {lesson.status === 'Confirmed' && (
                <ClockIcon className="w-3.5 h-3.5" />
              )}
              {lesson.status}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4 flex-shrink-0" />
              <span>{format(lessonDate, 'MMMM dd, yyyy')}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <ClockIcon className="w-4 h-4 flex-shrink-0" />
              <span>{format(lessonDate, 'HH:mm')}</span>
            </div>

            {lesson.students.length > 0 ? (
              <div className="flex items-start gap-2 text-sm">
                <UserIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-600 dark:text-gray-400" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Students: </span>
                  <span className="text-gray-600 dark:text-gray-400">{lesson.students.join(', ')}</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                No students
              </div>
            )}

            {lesson.tutor && (
              <div className="text-sm">
                <span className="font-medium text-gray-900 dark:text-white">Tutor: </span>
                <span className="text-gray-600 dark:text-gray-400">{lesson.tutor}</span>
              </div>
            )}
          </div>
        </div>

        {isAvailable && onTakeClass && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => onTakeClass(lesson.id)}
              className="btn-primary w-full"
            >
              Take Class
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
