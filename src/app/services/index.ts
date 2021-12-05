import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorage = {
  async set(key: string, value: string) {
    await AsyncStorage.setItem(`@${key}`, value);
  },
  async get(key: string) {
    return await AsyncStorage.getItem(`@${key}`);
  },
  async delete(key: string) {
    await AsyncStorage.removeItem(`@${key}`);
  },
  async clear() {
      await AsyncStorage.clear();
  }
};

function exists(array: any[], item: any){
    for (let i = 0; i < array.length; i++) {
        if(JSON.stringify(array[i].data) == JSON.stringify(item.data))
            return true;
    }
    return false;
}

export const pushIfNotExists = (array: any[], item: any) => {
    if(!exists(array, item)) {
        array.push(item)
    }
};

