import {StoreAction} from '../../types';

export const UPDATE_DETAILS_SETTINGS_ACTION = 'UPDATE_DETAILS_SETTINGS_ACTION';
export const LOAD_DETAILS_SETTINGS_ACTION = 'LOAD_SETTINGS_ACTION';
export const initSettings = {
  title: true,
  publicationDate: true,
  contentType: true,
  authors: true,
  subject: true,
  publisher: true,
  abstract: true,
  doi: true,
  openaccess: true,
};
export function detailSettingReucer(
  state: any = initSettings,
  action: StoreAction,
) {
  switch (action.type) {
    case UPDATE_DETAILS_SETTINGS_ACTION:
      return action.payload;

    case LOAD_DETAILS_SETTINGS_ACTION:
      return action.payload;
    default:
      return state;
  }
}
