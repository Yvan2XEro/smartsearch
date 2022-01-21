import AsyncStorage from '@react-native-async-storage/async-storage';

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// object pour manipuler le AsyncStorage
export const localStorage = {
  async set(key: string, value: string) {
    await AsyncStorage.setItem(`@${key}`, value);
  },
  async get(key: string, defaultValue: string = '') {
    return (await AsyncStorage.getItem(`@${key}`)) || defaultValue;
  },
  async delete(key: string) {
    await AsyncStorage.removeItem(`@${key}`);
  },
  async clear() {
    await AsyncStorage.clear();
  },
};

// Utilisees par pushSearchResultsIfNotExists
function exists(array: any[], item: any) {
  for (let i = 0; i < array.length; i++) {
    if (
      JSON.stringify(array[i].data) == JSON.stringify(item.data) ||
      (array[i].hasOwnProperty('query') &&
        item.hasOwnProperty('query') &&
        array[i].query == item.query)
    ) {
      return true;
    }
  }
  return false;
}

export const pushSearchResultsIfNotExists = (array: any[], item: any) => {
  if (!exists(array, item)) {
    array.push(item);
    return true;
  }
  return false;
};
