const ls = localStorage;

export default {
  setItem(name: string, value: any) {
    ls.setItem(name, value);
  },
  getItem(name: string) {
    try {
      return ls.getItem(name) || "";
    } catch (e) {
      return null;
    }
  },
  removeItem(name: string) {
    ls.removeItem(name);
  },
};
