import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export function useCultures() {
  const [cultures, setCultures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cultures')
      .then((res) => setCultures(res.data))
      .catch((err) => console.error('Failed to load cultures:', err))
      .finally(() => setLoading(false));
  }, []);

  return { cultures, loading };
}
