import React from 'react';
import axios from 'axios';
import localStore from 'store';

class LogoNav extends React.Component {
  componentWillMount() {
    this.setState({
      loggedin: localStore.get('loggedin')
    });
  }
  logout(e) {
    axios.post('/logout').then((response) => {
      if (response.data) {
        localStore.set('loggedin', false);
        window.location.pathname = '/';
      }
    });
  }
  render () {
    let { loggedin } = this.state;
    if (loggedin) {
      return <div className="row">
        <div className="col-sm-4">
          <h1 className=""><a href="/">MyBookList</a></h1>
        </div>
        <div className="col-sm-8">
          <div className="rightNav text-right">
            <a href="/search">Search</a> | <a href={'/list/' + loggedin}>My List</a> | <a href="/logout" onClick={this.logout}>Logout</a>
          </div>
        </div>
      </div>
    }
    return <div className="row">
      <div className="col-sm-4">
        <h1 className=""><a href="/">MyBookList</a></h1>
      </div>
      <div className="col-sm-8">
        <div className="rightNav text-right">
          <a href="/search">Search</a> | <a href="/register">Register</a> | <a href="/login">Login</a>
        </div>
      </div>
    </div>
  }
}

export default LogoNav;
