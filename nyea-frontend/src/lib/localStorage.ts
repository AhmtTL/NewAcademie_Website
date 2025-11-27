/**
 * Robust localStorage utility with error handling and type safety
 * Handles all edge cases including browser compatibility, quota exceeded, and data corruption
 */

export class LocalStorageError extends Error {
  constructor(message: string, public readonly operation: string) {
    super(message);
    this.name = 'LocalStorageError';
  }
}

/**
 * Check if localStorage is available and functional
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    
    // Test localStorage functionality
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safely get an item from localStorage with type safety
 */
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) {
    console.warn(`localStorage not available, returning default value for key: ${key}`);
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    // If parsing fails, try to remove the corrupted item
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore cleanup errors
    }
    return defaultValue;
  }
};

/**
 * Safely set an item to localStorage
 */
export const setToLocalStorage = <T>(key: string, value: T): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn(`localStorage not available, cannot save key: ${key}`);
    return false;
  }

  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.code === 22) {
      // QuotaExceededError
      console.error('localStorage quota exceeded. Attempting to clear old data...');
      throw new LocalStorageError('Storage quota exceeded', 'setItem');
    }
    console.error(`Error writing to localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Safely remove an item from localStorage
 */
export const removeFromLocalStorage = (key: string): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn(`localStorage not available, cannot remove key: ${key}`);
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all localStorage data (use with caution)
 */
export const clearLocalStorage = (): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available, cannot clear');
    return false;
  }

  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Get localStorage usage information
 */
export const getStorageInfo = (): { used: number; available: number; quota: number } => {
  if (!isLocalStorageAvailable()) {
    return { used: 0, available: 0, quota: 0 };
  }

  try {
    let used = 0;
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        used += window.localStorage[key].length + key.length;
      }
    }

    // Estimate quota (typically 5-10MB)
    const quota = 5 * 1024 * 1024; // 5MB estimate
    const available = quota - used;

    return { used, available, quota };
  } catch {
    return { used: 0, available: 0, quota: 0 };
  }
}; 