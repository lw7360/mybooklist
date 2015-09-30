import Promise from 'bluebird';
import google from 'googleapis';

function books (API_KEY) {
  let googlebooks = Promise.promisify(google.books('v1').volumes.list);

  function bookSearch (query) {
    let params = {
      q: query,
      key: API_KEY
    };
    return googlebooks(params);
  }

  return bookSearch;
}

export default books;
