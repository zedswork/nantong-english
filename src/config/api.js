// API Configuration
// In development, Vite proxy handles /api routes
// In production, we need the full URL to the Digital Ocean droplet

const isDevelopment = import.meta.env.DEV;

// Digital Ocean API Server
// Note: Using HTTP because HTTPS requires a domain (blocked in China)
const PRODUCTION_API_URL = 'http://159.65.155.75:3001';

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
