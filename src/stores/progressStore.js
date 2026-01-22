import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProgressStore = create(
  persist(
    (set, get) => ({
      // Local progress (for offline / non-logged-in users)
      localProgress: {},
      
      // Stats
      stats: {
        completed: 0,
        correct: 0,
        incorrect: 0,
      },

      // Record an answer
      recordAnswer: (itemId, isCorrect) => {
        set((state) => {
          const newProgress = {
            ...state.localProgress,
            [itemId]: {
              isCorrect,
              attempts: (state.localProgress[itemId]?.attempts || 0) + 1,
              lastAttempt: new Date().toISOString(),
            },
          };

          // Recalculate stats
          const values = Object.values(newProgress);
          const stats = {
            completed: values.length,
            correct: values.filter((p) => p.isCorrect).length,
            incorrect: values.filter((p) => !p.isCorrect).length,
          };

          return { localProgress: newProgress, stats };
        });
      },

      // Check if item has been answered
      getProgress: (itemId) => {
        return get().localProgress[itemId] || null;
      },

      // Reset progress
      resetProgress: () => {
        set({
          localProgress: {},
          stats: { completed: 0, correct: 0, incorrect: 0 },
        });
      },

      // Get accuracy rate
      getAccuracy: () => {
        const { correct, completed } = get().stats;
        if (completed === 0) return 0;
        return Math.round((correct / completed) * 100);
      },
    }),
    {
      name: 'progress-storage',
    }
  )
);
