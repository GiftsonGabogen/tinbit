export default (key: string) => {
  const setItem = (value: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = () => {
    return window.localStorage.getItem(key);
  };

  return [setItem, getItem];
};
