import axios from 'axios';
import localStore from 'store';
import React from 'react';
import LogoNav from '../LogoNav.jsx';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentWillMount () {
    document.title = 'Login';
  }
  handleSubmit (e) {
    e.preventDefault();
    let username = React.findDOMNode(this.refs.username).value.trim();
    let password = React.findDOMNode(this.refs.password).value;

    let params = {
      username,
      password
    };

    axios.post('/login', params).then(function (response) {
      if (response.data) {
        localStore.set('loggedin', true);
        window.location.pathname = '/';
      }
    }).catch(function (response) {
      this.setState({ error: 'Incorrect Username or Password.' });
    }.bind(this));

  }
  render () {
    this.props.done();
    return <div className="container">
      <LogoNav />
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <hr />
        <fieldset>
          {/* Form Name */}
          <h2>Login</h2>
          {/* Error */}
          {(() => {
            if (this.state.error) {
            return <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign"></span> {this.state.error}
            </div>
            }
          })()}
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="username">Username</label>  
            <div className="col-md-4">
              <input ref="username" name="username" type="text" className="form-control input-md" required />
            </div>
          </div>
          {/* Password input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="password">Password</label>
            <div className="col-md-4">
              <input ref="password" name="password" type="password" className="form-control input-md" required />
            </div>
          </div>
          {/* Button*/}
          <div className="form-group">
            <div className="col-md-4">
              <button id="submitbutton" name="submitbutton" className="btn btn-default">Login</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  }
}

export default Login;
