import { Lesson } from '../types';
import LessonCard from './LessonCard';

interface LessonSectionProps {
  title: string;
  lessons: Lesson[];
  onTakeClass?: (lessonId: string) => void;
  emptyMessage?: string;
}

const LessonSection = ({
  title,
  lessons,
  onTakeClass,
  emptyMessage = 'No lessons',
}: LessonSectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
        <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">
          ({lessons.length})
        </span>
      </h3>

      {lessons.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} onTakeClass={onTakeClass} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonSection;
