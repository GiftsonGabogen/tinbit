export enum LocalStorageEnum {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export default (key: LocalStorageEnum) => {
  const setItem = (value: string) => {
    window.localStorage.setItem(key, value);
  };

  const getItem = (): string | null => {
    return window.localStorage.getItem(key);
  };

  return { setItem, getItem };
};
