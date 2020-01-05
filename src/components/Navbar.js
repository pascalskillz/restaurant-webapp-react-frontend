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

  closeBox = () => {
    // TODO: close the menu when click outside
    this.setState({
      boxToggle: false
    });
  };

  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <nav className='nav'>
            <div className='logo-div'>
              <img src={logo2} alt='LOGO!' />
            </div>
            <div className='dropdown-div'>
              <NavLink
                style={
                  this.props.page === 'HOME'
                    ? { textDecoration: 'underline' }
                    : {}
                }
                // className='navbar-brand'
                to='/'
                onClick={() => this.closeBox()}>
                HOME
              </NavLink>
              <NavLink
                style={
                  this.props.page === 'MENU'
                    ? { textDecoration: 'underline' }
                    : {}
                }
                // className='navbar-brand'
                to='#'
                onClick={() => this.setToggleBox()}>
                MENU
              </NavLink>
              <NavLink
                style={
                  this.props.page === 'RESERVATION'
                    ? { textDecoration: 'underline' }
                    : {}
                }
                // className='navbar-brand'
                to='/reservation'
                onClick={() => this.closeBox()}>
                RESERVATION
              </NavLink>

              <NavLink
                style={
                  this.props.page === 'LOGIN'
                    ? { textDecoration: 'underline' }
                    : {}
                }
                // className='navbar-brand'
                to='/login'
                onClick={() => this.closeBox()}>
                LOGIN
              </NavLink>
              <NavLink
                style={
                  this.props.page === 'SIGNUP'
                    ? { textDecoration: 'underline' }
                    : {}
                }
                // className='navbar-brand'
                to='/signup'
                onClick={() => this.closeBox()}>
                SIGNUP
              </NavLink>
              <NavLink
                style={
                  this.props.page === 'CONTACT'
                    ? { textDecoration: 'underline' }
                    : {}
                }
                // className='navbar-brand'
                to='/contact'
                onClick={() => this.closeBox()}>
                CONTACT
              </NavLink>
              <NavLink
                style={
                  this.props.page === 'CART'
                    ? { textDecoration: 'underline' }
                    : {}
                }
                // className='navbar-brand'
                to='/cart'
                onClick={() => this.closeBox()}>
                CART
              </NavLink>
            </div>

            <div
              className='menu-box'
              style={
                this.state.boxToggle ? { display: 'grid' } : { display: 'none' }
              }>
              {/* <div className="menu-box" style={this.state.boxToggle ? {height: 0} : {height: '100%'} }> */}
              <div className='box-items'>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=1'>
                    Appetizer
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=5'>
                    Chicken Specialty{' '}
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=10'>
                    Dosai
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=6'>
                    Lamb Speciality
                  </a>
                </div>
                {/* </div> */}

                {/* <div className="box-item" > */}

                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=9'>
                    Rice Speciality{' '}
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=7'>
                    Seafood Specialties{' '}
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=2'>
                    Soup
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=3'>
                    Tandoor Bread
                  </a>
                </div>

                {/* </div> */}
                {/* <div className="box-item" > */}

                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=4'>
                    Tandoor Speciality
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu?category=8'>
                    Vegetarian Speciality
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu'>
                    North Indian Dinner/Thali
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu'>
                    Accompaniments{' '}
                  </a>
                </div>

                {/* </div> */}
                {/* <div className="box-item" > */}

                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu'>
                    Desserts{' '}
                  </a>
                </div>
                <div className='box-inner-item'>
                  <img className='img11' src={logo2} alt='LOGO!' />{' '}
                  <a className='menu-list' href='/menu'>
                    Beverages
                  </a>
                </div>
              </div>
              <div className='fu-me'>
                <button id='full-menu-button' className='full-menu'>
                  <a className='menu-list' href='/menu'>
                    {' '}
                    View Full Menu{' '}
                  </a>{' '}
                </button>
              </div>
            </div>
            <div className='social-icon-div'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='http://www.facebook.com'>
                <i className='fa fa-facebook'></i>
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='http://www.twitter.com'>
                <i className='fa fa-twitter'></i>
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='http://www.instagram.com'>
                <i className='fa fa-instagram'></i>
              </a>
            </div>
          </nav>
        )}
      </MyConsumer>
    );
  }
}

export default Navbar;
