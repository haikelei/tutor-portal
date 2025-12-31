import { create } from 'zustand';
import { Lesson, DateRange } from '../types';
import { api } from '../services/api';
import { isSameDay, isWithinInterval, startOfDay, endOfDay, format } from 'date-fns';

export interface LessonsByMonth {
  monthKey: string;
  monthLabel: string;
  lessons: Lesson[];
}

interface LessonsState {
  lessons: Lesson[];
  filteredLessons: Lesson[];
  loading: boolean;
  error: string | null;
  selectedMonth: Date | null;
  dateRange: DateRange;
  
  fetchLessons: () => Promise<void>;
  takeLesson: (lessonId: string) => Promise<void>;
  setSelectedMonth: (month: Date | null) => void;
  setDateRange: (range: DateRange) => void;
  filterLessons: () => void;
  getLessonsByType: (type: Lesson['type']) => Lesson[];
  getLessonsGroupedByMonth: () => LessonsByMonth[];
}

export const useLessonsStore = create<LessonsState>((set, get) => ({
  lessons: [],
  filteredLessons: [],
  loading: false,
  error: null,
  selectedMonth: null,
  dateRange: { startDate: null, endDate: null },

  fetchLessons: async () => {
    set({ loading: true, error: null });
    try {
      const lessons = await api.getLessons();
      
      // Automatically categorize lesson types
      const now = new Date();
      
      const categorizedLessons = lessons.map(lesson => {
        const lessonDate = new Date(lesson.date);
        
        // If lesson is today
        if (isSameDay(lessonDate, now)) {
          return { ...lesson, type: "Today's" as const };
        }
        
        // If lesson is completed
        if (lesson.status === 'Completed') {
          return { ...lesson, type: 'Historic' as const };
        }
        
        // If lesson is confirmed but not completed
        if (lesson.status === 'Confirmed' && lessonDate > now) {
          return { ...lesson, type: 'Upcoming' as const };
        }
        
        // If lesson is available
        if (lesson.status === 'Available') {
          return { ...lesson, type: 'Available' as const };
        }
        
        return lesson;
      });
      
      set({ lessons: categorizedLessons, filteredLessons: categorizedLessons, loading: false });
      get().filterLessons();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch lessons',
        loading: false 
      });
    }
  },

  takeLesson: async (lessonId: string) => {
    set({ loading: true, error: null });
    try {
      const updatedLesson = await api.takeLesson(lessonId);
      const lessons = get().lessons.map(lesson =>
        lesson.id === lessonId ? updatedLesson : lesson
      );
      set({ lessons, loading: false });
      get().filterLessons();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to take lesson',
        loading: false 
      });
    }
  },

  setSelectedMonth: (month: Date | null) => {
    set({ selectedMonth: month });
    get().filterLessons();
  },

  setDateRange: (range: DateRange) => {
    set({ dateRange: range });
    get().filterLessons();
  },

  filterLessons: () => {
    const { lessons, selectedMonth, dateRange } = get();
    let filtered = [...lessons];

    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter(lesson => {
        const lessonDate = new Date(lesson.date);
        return (
          lessonDate.getMonth() === selectedMonth.getMonth() &&
          lessonDate.getFullYear() === selectedMonth.getFullYear()
        );
      });
    }

    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter(lesson => {
        const lessonDate = new Date(lesson.date);
        return isWithinInterval(lessonDate, {
          start: startOfDay(dateRange.startDate!),
          end: endOfDay(dateRange.endDate!),
        });
      });
    }

    set({ filteredLessons: filtered });
  },

  getLessonsByType: (type: Lesson['type']) => {
    return get().filteredLessons.filter(lesson => lesson.type === type);
  },

  getLessonsGroupedByMonth: () => {
    const lessons = get().filteredLessons;
    const grouped: Record<string, Lesson[]> = {};

    lessons.forEach(lesson => {
      const lessonDate = new Date(lesson.date);
      const monthKey = format(lessonDate, 'yyyy-MM');

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(lesson);
    });

    // Sort lessons within each month by date
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });

    // Convert to array and sort by month (newest first)
    return Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a)) // Sort months descending (newest first)
      .map(monthKey => ({
        monthKey,
        monthLabel: format(new Date(monthKey + '-01'), 'MMMM yyyy'),
        lessons: grouped[monthKey],
      }));
  },
}));

