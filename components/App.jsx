import React from 'react';
import InternalNav from 'react-internal-nav';
import Home from './home/Home.jsx';
import Book from './books/Book.jsx';
import Search from './search/Search.jsx';
import NProgress from 'nprogress';

class App extends React.Component {
  componentWillMount () {
    const { store } = this.props;
    window.addEventListener('popstate', () => {
      store.dispatch({type: 'URL', pathname: window.location.pathname});
    });
    store.subscribe(() => {
      NProgress.start();
      this.forceUpdate();
    });

    // running it once on load
    store.dispatch({type: 'URL', pathname: window.location.pathname});
  }
  onInternalNav (pathname) {
    if (pathname !== window.location.pathname) {
      window.history.pushState({}, '', pathname);
    }
    const { store } = this.props;
    store.dispatch({type: 'URL', pathname: window.location.pathname});
  }
  render () {
    const done = () => NProgress.done();
    const { store } = this.props;
    const curPath = store.getState().routing.get('URL');
    if (curPath === '/') {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
      	<Home store={store} done={done} />
      </InternalNav>;
    } else if (curPath.startsWith('/books/')) {
      const isbn = window.location.pathname.split('/').pop();
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Book store={store} isbn={isbn} done={done} />
       </InternalNav>
    } else if (curPath === '/search') {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Search store={store} done={done} />
       </InternalNav>
    } else if (curPath.startsWith('/search/')) {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Search store={store} done={done} />
      </InternalNav>
    } else { // Should probably 404
      return <div>404</div>
    }
  }
}

export default App;
