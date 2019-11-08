import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import '../styles/cPanel.css'

class ControlPanel extends Component {

  render() {
    return (
      <MyConsumer>
      {({ }) => (
        <div className='cpanel-container'>
          cPanel
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default ControlPanel;