import React from 'react';
import { createStore } from 'redux';
import App from './components/App.jsx';
import Reducer from './components/Reducer.jsx';

let store = createStore(Reducer);

let main = document.querySelector('#content');

React.render(<App store={store} />, main);
