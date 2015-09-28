import React from 'react';
import InternalNav from 'react-internal-nav';

class LogoNav extends React.Component {
  onInternalNav(pathname) {
    if (pathname !== window.location.pathname) {
      window.history.pushState({}, '', pathname);
      const { store } = this.props;
      store.dispatch({type: 'URL', pathname: window.location.pathname});
    }
  }
  render () {
    return <InternalNav onInternalNav={this.onInternalNav.bind(this)} className="row">
      <div className="col-sm-4">
        <h1 className=""><a href="/">MyBookList</a></h1>
      </div>
      <div className="col-sm-8">
        <div className="rightNav text-right">
          <a href="/search">Search</a> | <a href="/list">My List</a> | <a href="/logout">Logout</a>
        </div>
      </div>
    </InternalNav>
  }
}

export default LogoNav;
