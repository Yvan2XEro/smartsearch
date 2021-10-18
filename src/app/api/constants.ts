export const springer_api_key: string = '9020e0837c3c3dc0836fa0963c857265';
export const springer_url: string =
  'https://api.springernature.com/meta/v2/json?api_key=' + springer_api_key;

export const elsevier_api_key: string = 'dc396ed2b0108f4a9f52abd986db3d82';

export const elsevier_url: string =
  'https://api.elsevier.com/content/search/scopus?httpAccept=application/json&pageSize=10&apiKey' +
  elsevier_api_key;

export const google_api_key =
  '4a598c300793f6199b13cc68d158f6a090e746dbe57146e6adb9fb70759dfc0b';
export const google_scholar_url: string =
  'https://serpapi.com/search?engine=google_scholar&apikey=' + google_api_key;

export const ieee_api = 'kvgbvamz8jvsxzwjm5b6kuvm';
export const ieee_url =
  'http://ieeexploreapi.ieee.org/api/v1/search/articles?format=json&max_records=10&start_record=1&sort_order=asc&sort_field=article_number&apikey=' +
  ieee_api;
