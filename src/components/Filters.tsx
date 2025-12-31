import { useLessonsStore } from '../store/lessonsStore';
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const Filters = () => {
  const { selectedMonth, dateRange, setSelectedMonth, setDateRange } = useLessonsStore();

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const date = new Date(e.target.value + '-01');
      setSelectedMonth(date);
    } else {
      setSelectedMonth(null);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDateRange({
        startDate: new Date(e.target.value),
        endDate: dateRange.endDate,
      });
    } else {
      setDateRange({ startDate: null, endDate: dateRange.endDate });
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDateRange({
        startDate: dateRange.startDate,
        endDate: new Date(e.target.value),
      });
    } else {
      setDateRange({ startDate: dateRange.startDate, endDate: null });
    }
  };

  const clearFilters = () => {
    setSelectedMonth(null);
    setDateRange({ startDate: null, endDate: null });
  };

  const hasActiveFilters = selectedMonth !== null || dateRange.startDate !== null;

  // Format date for month input (YYYY-MM format)
  const monthValue = selectedMonth
    ? `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`
    : '';

  // Format date for date input (YYYY-MM-DD format)
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div className="card mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Filters:</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="month-filter" className="text-sm text-gray-600 dark:text-gray-400">
            By Month:
          </label>
          <input
            id="month-filter"
            type="month"
            value={monthValue}
            onChange={handleMonthChange}
            className="input text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="start-date" className="text-sm text-gray-600 dark:text-gray-400">
            Date Range:
          </label>
          <input
            id="start-date"
            type="date"
            value={formatDateForInput(dateRange.startDate)}
            onChange={handleStartDateChange}
            className="input text-sm"
            placeholder="Start Date"
          />
          <span className="text-gray-500 dark:text-gray-400">to</span>
          <input
            id="end-date"
            type="date"
            value={formatDateForInput(dateRange.endDate)}
            onChange={handleEndDateChange}
            className="input text-sm"
            placeholder="End Date"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
