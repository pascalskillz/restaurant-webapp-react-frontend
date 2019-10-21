import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import '../styles/content.css'

class Menu extends Component {
  render() {
    return (
      <MyConsumer>
      {({  }) => (
        <div>
       Menu

        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Menu;