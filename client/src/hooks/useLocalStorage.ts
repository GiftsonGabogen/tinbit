export enum LocalStorageEnum {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export default (key: LocalStorageEnum) => {
  const setItem = (value: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (): string | null => {
    return window.localStorage.getItem(key);
  };

  return { setItem, getItem };
};
