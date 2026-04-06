const CACHE_KEY = 'menu_items_cache';
const CACHE_TIME_KEY = 'menu_items_cache_time';
const CACHE_DURATION = 5 * 60 * 1000;

export const menuCache = {
  get: () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);

      if (cachedData && cacheTime) {
        const elapsed = Date.now() - parseInt(cacheTime);
        if (elapsed < CACHE_DURATION) {
          return JSON.parse(cachedData);
        }
      }
      return null;
    } catch (error) {
      console.error('Error reading menu cache:', error);
      return null;
    }
  },

  set: (data: any) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error setting menu cache:', error);
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIME_KEY);
      console.log('Menu cache cleared');
    } catch (error) {
      console.error('Error clearing menu cache:', error);
    }
  },

  getStale: () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.error('Error reading stale cache:', error);
      return null;
    }
  }
};
