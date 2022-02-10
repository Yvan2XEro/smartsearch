import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
// TODO: Utiliser un bon package pour Clipboard
import {Clipboard} from 'react-native'
// import Clipboard from '@react-native-clipboard/clipboard';

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


export const AppClipBoard = {
  setString: (text: string) => Clipboard.setString(text),
  getString:()=> Clipboard.getString()
}

export const Notification = {
  push: (message: string, title?: string)=>{
    PushNotification.localNotification({
      /* Android Only Properties */
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
      color: '#6c63ff', // (optional) default: system default
      title: title, // (optional)
      message: message, // (required)
    });
  }
}