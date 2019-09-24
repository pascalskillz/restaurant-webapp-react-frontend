import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import '../styles/content.css'

class Signup extends Component {
  render() {
    return (
      <MyConsumer>
      {({  }) => (
        <div>
          Signup
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Signup;