import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import API from '../utils/API'
import '../styles/cPanel.css'

class ControlPanel extends Component {
  state = {
    title: 'Welcome! Select a task to Begin',
  }

  setTitle = title => {
    this.setState({
      title: title
    })
  }

  render() {
    return (
      <MyConsumer>
      {({ }) => (
        <div className='cpanel-container'>
          <div className="cpanel-wrapper">
            <header className="cpanel-header">Tandoor Control Panel</header>
            <nav className="cpanel-dropdown">
              <button 
                className="cpanel-button"
                onClick={() => this.setTitle('Create')}
                >Create New Item</button>
              <button 
                className="cpanel-button"
                onClick={() => this.setTitle('Edit/Update')}
                >Edit/Update Item</button>
              <button 
                className="cpanel-button"
                onClick={() => this.setTitle('Delete')}
                >Delete Item</button>
              <button 
                className="cpanel-button"
                onClick={() => this.setTitle('X')}
                >X</button>
              <button 
                className="cpanel-button"
                onClick={() => this.setTitle('X')}
                >X</button>
            </nav>
            <main>
              <div className="title">
                {this.state.title}
              </div>
              <div className="edit-div">
                CONTENT
              </div>
            </main>
          </div>
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default ControlPanel;