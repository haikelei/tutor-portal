import { useEffect } from 'react';
import TopNavbar from '../components/Layout/TopNavbar';
import PageHeader from '../components/Layout/PageHeader';
import Filters from '../components/Filters';
import LessonSection from '../components/LessonSection';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useLessonsStore } from '../store/lessonsStore';

const Dashboard = () => {
  const {
    loading,
    error,
    fetchLessons,
    takeLesson,
    getLessonsByType,
    getLessonsGroupedByMonth,
    selectedMonth,
    dateRange,
  } = useLessonsStore();

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const handleTakeClass = async (lessonId: string) => {
    await takeLesson(lessonId);
  };

  const todaysLessons = getLessonsByType("Today's");
  const lessonsByMonth = getLessonsGroupedByMonth();
  const hasActiveFilters = selectedMonth !== null || dateRange.startDate !== null;

  // If filters are active, show by type. Otherwise, show grouped by month
  const showByMonth = !hasActiveFilters;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar />
      <main className="p-6 overflow-auto max-w-7xl mx-auto w-full">
        <PageHeader />
        
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && (
          <>
            <Filters />
            
            {todaysLessons.length > 0 && (
              <LessonSection
                title="Today's Lessons"
                lessons={todaysLessons}
              />
            )}
            
            {showByMonth ? (
              // Display lessons grouped by month
              lessonsByMonth.map(({ monthKey, monthLabel, lessons }) => {
                const historicLessons = lessons.filter(l => l.type === 'Historic');
                const upcomingLessons = lessons.filter(l => l.type === 'Upcoming');
                const availableLessons = lessons.filter(l => l.type === 'Available');

                return (
                  <div key={monthKey} className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      {monthLabel}
                    </h3>
                    
                    {upcomingLessons.length > 0 && (
                      <LessonSection
                        title="Upcoming Lessons"
                        lessons={upcomingLessons}
                        emptyMessage="No upcoming lessons"
                      />
                    )}
                    
                    {availableLessons.length > 0 && (
                      <LessonSection
                        title="Available Lessons"
                        lessons={availableLessons}
                        onTakeClass={handleTakeClass}
                        emptyMessage="No available lessons"
                      />
                    )}
                    
                    {historicLessons.length > 0 && (
                      <LessonSection
                        title="Historic Lessons"
                        lessons={historicLessons}
                        emptyMessage="No historic lessons"
                      />
                    )}
                  </div>
                );
              })
            ) : (
              // Display lessons by type when filters are active
              <>
                <LessonSection
                  title="Upcoming Lessons"
                  lessons={getLessonsByType('Upcoming')}
                  emptyMessage="No upcoming lessons"
                />
                
                <LessonSection
                  title="Available Lessons"
                  lessons={getLessonsByType('Available')}
                  onTakeClass={handleTakeClass}
                  emptyMessage="No available lessons"
                />
                
                <LessonSection
                  title="Historic Lessons"
                  lessons={getLessonsByType('Historic')}
                  emptyMessage="No historic lessons"
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

