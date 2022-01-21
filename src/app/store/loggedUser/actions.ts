import {UPDATE_USER_ACTION} from '.';
import {StoreAction, User} from '../../types';

export const updateUserAction = (user: User): StoreAction => ({
  payload: user,
  type: UPDATE_USER_ACTION,
});
