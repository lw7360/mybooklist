import React from 'react';
import Home from './home/Home.jsx';
import Book from './books/Book.jsx';
import StickyFooter from './StickyFooter.jsx';
import localStore from 'store';

class App extends React.Component {
  componentWillMount () {
    if (localStore.get('redirect')) { // Check for redirect
      let redirect = localStore.get('redirect');
      localStore.remove('redirect');
      window.location.pathname = redirect;
    }

    const { store } = this.props;
    window.addEventListener('popstate', () => {
      store.dispatch({type: 'URL', pathname: window.location.pathname});
    });
    // running it once on load
    store.dispatch({type: 'URL', pathname: window.location.pathname});

    store.subscribe(() => {
      console.log(store.getState())
      this.forceUpdate();
    });
  }
  render () {
    const { store } = this.props;
    const curPath = store.getState().routing.get('URL');

    if (curPath === '/') {
      return <Home store={store} />;
    } else if (curPath.startsWith('/books/')) {
      const isbn = window.location.pathname.split('/').pop();
      return <Book store={store} isbn={isbn} />
    } else if (curPath === '/search') {
      return <Home store={store} />
    } else if (curPath.startsWith('/search/')) {
      return <Home store={store} />
    } else { // Should probably 404
      return <Home store={store} />
    }
  }
}

export default App;
