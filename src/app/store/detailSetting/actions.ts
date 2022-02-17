import {
  initSettings,
  LOAD_DETAILS_SETTINGS_ACTION,
  UPDATE_DETAILS_SETTINGS_ACTION,
} from '.';
import {localStorage} from '../../services';

const SETTINGS_KEY = 'settings';

async function getSettings() {
  return JSON.parse(
    await localStorage.get(SETTINGS_KEY, JSON.stringify(initSettings)),
  );
}

export const loadSettingsAction = () => async (dispatch: any) => {
  const settings = await getSettings();
  return dispatch({
    type: LOAD_DETAILS_SETTINGS_ACTION,
    payload: settings,
  });
};
export const updateDetailtingsAction = (settings: any) => {
  return {
    type: UPDATE_DETAILS_SETTINGS_ACTION,
    payload: settings,
  };
};
