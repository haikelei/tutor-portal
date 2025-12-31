import axios from 'axios';
import { Lesson } from '../types';
import { mockLessons } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Mock login
  async login(email: string, password: string): Promise<{ user: { id: string; name: string; email: string }; token: string }> {
    await delay(800); // Mock network delay
    
    // Mock login verification
    if (email && password) {
      return {
        user: {
          id: '1',
          name: 'Sarah Tan',
          email: email
        },
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    
    throw new Error('Invalid credentials');
  },

  // Get all lessons
  async getLessons(): Promise<Lesson[]> {
    await delay(600);
    return mockLessons;
  },

  // Take lesson
  async takeLesson(lessonId: string): Promise<Lesson> {
    await delay(500);
    
    // If there is a real API, use this:
    // const response = await axios.post(`${API_BASE_URL}/lessons/${lessonId}/take`);
    // return response.data;
    
    // Mock take lesson
    const lesson = mockLessons.find(l => l.id === lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    
    if (lesson.status !== 'Available') {
      throw new Error('Lesson is not available');
    }
    
    // Update lesson status
    lesson.status = 'Confirmed';
    lesson.tutor = 'Sarah Tan';
    lesson.type = 'Upcoming';
    
    return lesson;
  }
};

