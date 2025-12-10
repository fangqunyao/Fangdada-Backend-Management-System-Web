export default {
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },

  clearAll: () => {
    localStorage.clear();
  },
};
