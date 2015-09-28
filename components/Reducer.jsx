import { combineReducers } from 'redux';
import Immutable from 'immutable';

function routing(state = Immutable.Map(), action) {
  switch (action.type) {
  case 'URL':
    return state.set('URL', action.pathname);
  default:
    return state;
  }
}

const Reducer = combineReducers({
  routing
});

export default Reducer;
