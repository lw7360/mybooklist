import axios from 'axios';
import React from 'react';
import InternalNav from 'react-internal-nav';
import Home from './home/Home.jsx';
import Book from './books/Book.jsx';
import Login from './login/Login.jsx';
import Register from './register/Register.jsx';
import Search from './search/Search.jsx';
import NProgress from 'nprogress';
import localStore from 'store';

class App extends React.Component {
  componentWillMount () {
    const { store } = this.props;
    window.addEventListener('popstate', () => {
      store.dispatch({type: 'URL', pathname: window.location.pathname});
    });
    store.subscribe(() => {
      if (store.getState().routing.get('LASTACTION') === 'URL') {
        this.forceUpdate();
        NProgress.start();
      }
    });

    let loggedin = localStore.get('loggedin');
    if (typeof loggedin === 'undefined') {
      this.setState({ loggedin: 'unsure' });
      axios.get('/user').then(function (response) {
        localStore.set('loggedin', response.data);
        this.setState({ loggedin: response.data });
      }.bind(this));
    } else {
      this.setState({ loggedin });
    }

    // running it once on load
    store.dispatch({type: 'URL', pathname: window.location.pathname});
  }
  onInternalNav (pathname) {
    if (pathname === '/logout') {
      return;
    }
    if (pathname !== window.location.pathname) {
      window.history.pushState({}, '', pathname);
    }
    const { store } = this.props;
    store.dispatch({type: 'URL', pathname: window.location.pathname});
  }
  render () {
    if (this.state.loggedin === 'unsure') {
      return <div></div>
    }
    const done = () => NProgress.done();
    const { store } = this.props;
    const curPath = store.getState().routing.get('URL');
    if (curPath === '/') {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
      	<Home store={store} done={done} loggedin={this.state.loggedin} />
      </InternalNav>;
    } else if (curPath.startsWith('/books/')) {
      const id = window.location.pathname.split('/').pop();
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Book store={store} id={id} done={done} />
       </InternalNav>
    } else if (curPath === '/search') {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Search store={store} done={done} />
       </InternalNav>
    } else if (curPath.startsWith('/search/')) {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Search store={store} done={done} />
      </InternalNav>
    } else if (curPath === '/login') {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Login store={store} done={done} />
      </InternalNav>
    } else if (curPath === '/register') {
      return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
        <Register store={store} done={done} />
      </InternalNav>
    } else { // Should probably 404
      return <div>404</div>
    }
  }
}

export default App;
