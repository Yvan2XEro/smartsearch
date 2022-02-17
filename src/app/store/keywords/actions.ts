import {
  ADD_KEYWORD_ACTION,
  DELETE_KEYWORD_ACTION,
  LOAD_KEYWORDS_ACTION,
} from '.';
import {localStorage} from '../../services';

const KEYWORDS_KEY = 'keywords';

async function getKeywords() {
  const str = await localStorage.get(KEYWORDS_KEY, JSON.stringify([]));
  const keywords = JSON.parse(str) as string[];
  return keywords;
}

export const addKeywordAction = (word: string) => async (dispatch: any) => {
  const keywords = await getKeywords();
  keywords.push(word.toLowerCase());
  await localStorage.set(KEYWORDS_KEY, JSON.stringify(keywords));
  return dispatch({
    type: ADD_KEYWORD_ACTION,
    payload: word.toLowerCase(),
  });
};

export const deleteKeywordAction = (word: string) => async (dispatch: any) => {
  let keywords = await getKeywords();
  keywords = keywords.filter(w => w != word.toLowerCase());
  await localStorage.set(KEYWORDS_KEY, JSON.stringify(keywords));
  return dispatch({
    type: DELETE_KEYWORD_ACTION,
    payload: word.toLowerCase(),
  });
};
export const loadKeywordsAction = () => async (dispatch: any) => {
  let keywords = await getKeywords();
  // console.log("icicicicicicicici", keywords)
  return dispatch({
    type: LOAD_KEYWORDS_ACTION,
    payload: keywords,
  });
};
