import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUserLanguage = () => {
  const [language, setLanguage] = useState<string>('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLanguage('en');
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('language_preference')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile?.language_preference) {
          setLanguage(profile.language_preference);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const updateLanguage = async (newLanguage: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ language_preference: newLanguage })
        .eq('user_id', user.id);

      if (error) throw error;

      setLanguage(newLanguage);
    } catch (error) {
      console.error('Failed to update language preference:', error);
      throw error;
    }
  };

  return { language, loading, updateLanguage };
};
