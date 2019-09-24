import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import '../styles/content.css'


class Main extends Component {
  render() {
    return (
      <MyConsumer>
      {({  }) => (
        <div>
          Welcome to Tandoori Restauraunt
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Main;