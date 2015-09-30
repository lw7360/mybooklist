import React from 'react';
import CascadingBooks from './CascadingBooks.jsx';
import InternalNav from 'react-internal-nav';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class Index extends React.Component {
  onInternalNav(pathname) {
    if (pathname !== window.location.pathname) {
      window.history.pushState({}, '', pathname);
      const { store } = this.props;
      store.dispatch({type: 'URL', pathname: window.location.pathname});
    }
  }
  render () {
    const { store, done } = this.props;
    done();
    return <InternalNav onInternalNav={this.onInternalNav.bind(this)}>
      <div className='container'>
        <LogoNav store={store} />
        <br />
        <p>
          Keep track of the books you read.
          <br />
          <a href='/register'>Register</a> now, or
          <a href='/search'> search</a> for some books first.
        </p>
        <CascadingBooks />
      </div>
      <StickyFooter />
    </InternalNav>
  }
}

export default Index;
