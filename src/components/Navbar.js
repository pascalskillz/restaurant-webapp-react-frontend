import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MyConsumer } from '../Context';
import '../styles/Navbar.css';
import logo2 from '../img/Logo2.png';

class Navbar extends Component {
  state = {
    boxToggle: false
  };

  setToggleBox = () => {
    this.setState({
      boxToggle: !this.state.boxToggle
    });
  };

  render() {
    return (
      <MyConsumer>
        {({}) => (
          <nav className='navbar'>
            <div className='logo-icon'>
              <div className='logo-div'>
                <img src={logo2} alt='LOGO!' />
              </div>
              <div className='icon-div'>
                <a target='_blank' href='http://www.facebook.com'>
                  <i className='fa fa-facebook'></i>
                </a>
                <a target='_blank' href='http://www.twitter.com'>
                  <i className='fa fa-twitter'></i>
                </a>
                <a target='_blank' href='http://www.instagram.com'>
                  <i className='fa fa-instagram'></i>
                </a>
              </div>
            </div>
            <div className='dropdown-div'>
              <NavLink className='navbar-brand' to='/'>
                HOME
              </NavLink>
              <NavLink className='menu' to='/menu'>
                Menu
                <ul className='list'>
                  <li>item1</li>
                  <li>item2</li>
                  <li>item3</li>
                  <li>item</li>
                </ul>
              </NavLink>
              <NavLink className='navbar-brand' to='/reservation'>
                Reservation
              </NavLink>
              <NavLink className='navbar-brand' to='/login'>
                Login
              </NavLink>
              <NavLink className='navbar-brand' to='/signup'>
                SIGNUP
              </NavLink>
              <NavLink
                className='navbar-brand'
                to='/menu'
                onClick={() => this.setToggleBox()}>
                test
              </NavLink>
            </div>
          </nav>
        )}
      </MyConsumer>
    );
  }
}

export default Navbar;
