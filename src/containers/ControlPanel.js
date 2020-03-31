import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import CreateWidget from '../components/Widgets/CreateWidget';
import DeleteWidget from '../components/Widgets/DeleteWidget';
import EditWidget from '../components/Widgets/EditWidget';
import ItemCatalog from '../components/Widgets/ItemCatalog';
import Orders from '../components/Widgets/Orders';
import '../styles/cPanel.css';

class ControlPanel extends Component {
  state = {
    // title: 'Welcome! Select a task to Begin',
    // title: 'Create'
    // title: 'Edit/Update',
    // title: 'Delete',
    title: 'Menu Item Catalog'
  };

  componentDidMount() {
    // this.setAction('Menu Item Catalog')
    // this.setTitle('Menu Item Catalog')
  }

  setTitle = title => {
    this.setState({
      title: title
    });
  };

  setAction = action => {
    switch (action) {
      case 'Menu Item Catalog':
        return <ItemCatalog />;
      case 'Orders':
        return <Orders />;
      // case 'Create A New Item':
      //   return <CreateWidget />;
      // case 'Edit A Menu Item':
      //   return <EditWidget />;
      default:
        return <ItemCatalog />;
    }
  };

  render() {
    return (
      <MyConsumer>
        {({  }) => (
          <div className='cpanel-container'>
            <div className='cpanel-wrapper'>
              <header className='cpanel-header'>Tandoor Control Panel</header>
              <nav className='cpanel-dropdown'>
                <button
                  className='cpanel-button'
                  onClick={() => this.setTitle('Menu Item Catalog')}>
                  Menu Item Catalog
                </button>
                <button
                  className='cpanel-button'
                  onClick={() => this.setTitle('Orders')}>
                  Orders
                </button>
              </nav>
              <main>
                <div className='title'>{this.state.title}</div>
                <div className='cpanel-action-container'>
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
