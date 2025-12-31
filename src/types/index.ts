export type LessonStatus = 'Completed' | 'Confirmed' | 'Available';

export type LessonType = 'Historic' | 'Upcoming' | 'Available' | "Today's";

export interface Lesson {
  id: string;
  date: string;
  type: LessonType;
  subject: string;
  students: string[];
  tutor: string | null;
  status: LessonStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

