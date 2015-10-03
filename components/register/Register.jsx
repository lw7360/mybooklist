import axios from 'axios';
import React from 'react';
import LogoNav from '../LogoNav.jsx';

class Register extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    let username = React.findDOMNode(this.refs.username).value.trim();
    let email = React.findDOMNode(this.refs.email).value.trim();
    let password = React.findDOMNode(this.refs.password).value;

    let params = {
      username,
      email,
      password
    };

    axios.post('/register', params).then(function (response) {
      console.log(response);
    });

  }
  render () {
    this.props.done();
    return <div className="container">
      <LogoNav />
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <hr />
        <fieldset>
          {/* Form Name */}
          <h2>Register</h2>
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="username">Username</label>  
            <div className="col-md-4">
              <input ref="username" name="username" type="text" className="form-control input-md" required />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="email">Email</label>  
            <div className="col-md-4">
              <input ref="email" name="email" type="email" className="form-control input-md" required />
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
              <button id="submitbutton" name="submitbutton" className="btn btn-default">Register</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  }
}

export default Register;
