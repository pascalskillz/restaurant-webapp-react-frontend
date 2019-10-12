import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import '../styles/content.css';

class Login extends Component {
  render() {
    return (
      <MyConsumer>
      {({  }) => (
        <div className="Container">
          
        <h1 className="signin-text-primary">Sign In</h1>
        <p className="lead1">Sign into Your Account</p>
          <form className="signin-form">
            <div className="signin-form-group">
              <input
                type="email"
                placeholder="Email-Address"
                name="email"
                required/>
            </div>
            <input 
            type="submit" className="btn btn-Primary" value="Login"/>
          </form>
          <p className="my-1">
            Don't have an account? <a href="Signup.js">Sign Up</a>
          </p>
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Login;