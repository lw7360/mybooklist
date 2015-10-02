import Promise from 'bluebird';
import google from 'googleapis';

function books (API_KEY) {
  let gooGet = Promise.promisify(google.books('v1').volumes.get);
  let gooList = Promise.promisify(google.books('v1').volumes.list);

  function get (volumeId) {
    let params = {
      volumeId,
      key: API_KEY
    }

    return gooGet(params);
  }

  function list (q) {
    let params = {
      q,
      key: API_KEY
    };

    return gooList(params);
  }

  return {
    get,
    list
  };
}

export default books;
