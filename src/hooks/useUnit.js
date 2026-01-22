import { useState, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

export function useUnit(unitCode = '8B-U1') {
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        const data = await api.get(API_ENDPOINTS.unit(unitCode));
        setUnit(data.unit);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch unit:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUnit();
  }, [unitCode]);

  return { unit, loading, error };
}

export function useVocabulary(unitCode = '8B-U1') {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        setLoading(true);
        const data = await api.get(API_ENDPOINTS.vocabulary(unitCode));
        setVocabulary(data.vocabulary);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch vocabulary:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVocabulary();
  }, [unitCode]);

  return { vocabulary, loading, error };
}

export function usePhrases(unitCode = '8B-U1') {
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        setLoading(true);
        const data = await api.get(API_ENDPOINTS.phrases(unitCode));
        setPhrases(data.phrases);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch phrases:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhrases();
  }, [unitCode]);

  return { phrases, loading, error };
}

export function useExercises(unitCode = '8B-U1') {
  const [exercises, setExercises] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const data = await api.get(API_ENDPOINTS.exercises(unitCode));
        setExercises(data.exercises);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [unitCode]);

  return { exercises, loading, error };
}
