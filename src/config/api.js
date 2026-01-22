// API Configuration
// In development, Vite proxy handles /api routes
// In production, API is on ibkr.hu with HTTPS

const isDevelopment = import.meta.env.DEV;

// API Server (HTTPS via ibkr.hu reverse proxy)
const PRODUCTION_API_URL = 'https://ibkr.hu/english-api';

export const API_BASE_URL = isDevelopment ? '' : PRODUCTION_API_URL;

export const API_ENDPOINTS = {
  // Auth
  login: '/api/auth/login',
  register: '/api/auth/register',
  me: '/api/auth/me',
  
  // Units
  units: '/api/units',
  unit: (code) => `/api/units/${code}`,
  
  // Vocabulary
  vocabulary: (unitCode) => `/api/vocabulary/unit/${unitCode}`,
  
  // Phrases
  phrases: (unitCode) => `/api/phrases/unit/${unitCode}`,
  
  // Readings
  readings: (unitCode) => `/api/readings/unit/${unitCode}`,
  
  // Exercises
  exercises: (unitCode) => `/api/exercises/unit/${unitCode}`,
  
  // Progress
  progress: (unitCode) => `/api/progress/unit/${unitCode}`,
  saveProgress: '/api/progress',
  batchProgress: '/api/progress/batch',
  
  // AI
  aiSentences: '/api/ai/sentences',
  aiStory: '/api/ai/story',
  aiStories: '/api/ai/stories',
};

// Helper function to build full URL
export function buildUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}
