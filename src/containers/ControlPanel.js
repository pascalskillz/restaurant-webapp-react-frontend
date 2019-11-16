import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import Create from '../components/Widgets/CreateWidget'
import Edit from '../components/Widgets/EditWidget'
import Delete from '../components/Widgets/DeleteWidget'
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

  setAction = action => {
    switch(action) {
      case 'Create':
        return <Create/>
      case 'Edit/Update':
        return <Edit/>
      case 'Delete':
        return <Delete/>
      default:
        return <div></div>
    }
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
              <div className="cpanel-action-div">
                {this.setAction(this.state.title)}
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