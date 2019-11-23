import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import '../styles/content.css'

class Reservation extends Component {
  render() {
    return (
      <MyConsumer>
      {({ state }) => (
        <div>
          Reservation
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Reservation;