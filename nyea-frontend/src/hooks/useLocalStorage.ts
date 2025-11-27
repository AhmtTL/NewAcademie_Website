import { useState, useEffect, useCallback, useRef } from 'react';
import { getFromLocalStorage, setToLocalStorage, LocalStorageError } from '../lib/localStorage';

/**
 * Custom hook for managing localStorage with React state synchronization
 * Provides automatic synchronization between localStorage and component state
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void, { error: string | null; loading: boolean }] {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const isInitialized = useRef(false);

  // Initialize value from localStorage
  useEffect(() => {
    try {
      setError(null);
      const value = getFromLocalStorage(key, defaultValue);
      setStoredValue(value);
    } catch (err) {
      setError(`Failed to load ${key} from localStorage: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setStoredValue(defaultValue);
    } finally {
      setLoading(false);
      isInitialized.current = true;
    }
  }, [key, defaultValue]);

  // Update localStorage when state changes
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setError(null);
      
      // Handle function updates
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update state immediately for responsive UI
      setStoredValue(valueToStore);
      
      // Persist to localStorage
      const success = setToLocalStorage(key, valueToStore);
      if (!success) {
        setError(`Failed to save ${key} to localStorage`);
      }
    } catch (err) {
      if (err instanceof LocalStorageError) {
        setError(`Storage error: ${err.message}`);
      } else {
        setError(`Failed to update ${key}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  }, [key, storedValue]);

  // Listen for storage events from other tabs/windows
  useEffect(() => {
    if (!isInitialized.current) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch {
          // If parsing fails, reload from localStorage
          const value = getFromLocalStorage(key, defaultValue);
          setStoredValue(value);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, defaultValue]);

  return [storedValue, setValue, { error, loading }];
} 