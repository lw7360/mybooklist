import React from 'react';
import InternalNav from 'react-internal-nav';

class LogoNav extends React.Component {
  render () {
    return <div className="row">
      <div className="col-sm-4">
        <h1 className=""><a href="/">MyBookList</a></h1>
      </div>
      <div className="col-sm-8">
        <div className="rightNav text-right">
          <a href="/search">Search</a> | <a href="/list">My List</a> | <a href="/logout">Logout</a>
        </div>
      </div>
    </div>
  }
}

export default LogoNav;
