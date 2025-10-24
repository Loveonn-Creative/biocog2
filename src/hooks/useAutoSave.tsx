import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAutoSaveOptions<T> {
  data: T;
  saveFunction: (data: T) => Promise<void>;
  debounceMs?: number;
  storageKey?: string;
  enabled?: boolean;
}

export const useAutoSave = <T,>({
  data,
  saveFunction,
  debounceMs = 500,
  storageKey,
  enabled = true,
}: UseAutoSaveOptions<T>) => {
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');
  const isSavingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const dataString = JSON.stringify(data);
    
    // Skip if data hasn't changed
    if (dataString === lastSavedRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Save to localStorage immediately for backup
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, dataString);
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }

    // Debounced database save
    timeoutRef.current = setTimeout(async () => {
      if (isSavingRef.current) return;

      try {
        isSavingRef.current = true;
        await saveFunction(data);
        lastSavedRef.current = dataString;
        
        // Clear localStorage backup after successful save
        if (storageKey) {
          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
        toast({
          title: 'Save Failed',
          description: 'Your changes are saved locally and will sync when possible.',
          variant: 'destructive',
        });
      } finally {
        isSavingRef.current = false;
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveFunction, debounceMs, storageKey, enabled, toast]);

  // Recovery function to get data from localStorage
  const recover = (): T | null => {
    if (!storageKey) return null;
    
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch (error) {
      console.error('Failed to recover from localStorage:', error);
    }
    return null;
  };

  return { recover, isSaving: isSavingRef.current };
};
