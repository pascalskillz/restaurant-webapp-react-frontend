import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import '../styles/content.css'

class Login extends Component {
  render() {
    return (
      <MyConsumer>
      {({  }) => (
        <div>
          Login
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Login;