import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import '../styles/content.css'

class Signup extends Component {
  render() {
    return (
      <MyConsumer>
      {({ state }) => (
        <div className="Container">
          <h1 className="Signup-text-primary"><i></i>Sgin Up</h1>
          <p className="lead2">Create Your account</p>
        <form className="-signup-form" action="Create-profile.html">
          <div className="signup-form-group">
            <input type="text" placeholder="Name" name="name" required/>
          </div><br/>
          <div>
            <input type="email" placeholder="Email Address" name="email" required/>
        
          </div><br/>
          <div>
          <input type="password" placeholder="Password" name="password1" required/>
          </div><br/>
          <div>
            <input type="password" placeholder="Confirm Password" name="password2" minlength="7"/>

          </div>
          <br/>
          <input type="submit" className="bttn btn-primary" value="Register"/>
        
        </form>
        <p>Already have an account? <a href="./containers/Login">Sign In</a></p>
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Signup;