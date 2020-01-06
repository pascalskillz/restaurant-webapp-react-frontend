import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MyConsumer } from '../Context';
import DropDown from '../components/DropDown';
import '../styles/Navbar.css';
import logo2 from '../img/Logo2.png';

class Navbar extends Component {
  state = {
    boxToggle: false,
    navBg: false
  };

  componentDidMount() {
    window.addEventListener('scroll', () =>
      this.handleNavShowHide(this.props.breakpoint)
    );
  }

  handleNavShowHide = el => {
    // grab element passed as argument
    let element = document.getElementById(el);
    // create an observable rectangle
    var rect = element.getBoundingClientRect();
    // if top of rectangle is 0 
    // meaning if the distance from the
    // top of the viewport is 0
    // then set nag bg to true
    // else false
    if (rect.top <= 0) {
      this.setState({
        navBg: true
      });
    } else {
      this.setState({
        navBg: false
      });
    }
  };

  // setToggleBox = () => {
  //   this.setState({
  //     boxToggle: !this.state.boxToggle
  //   });
  // };

  // closeBox = () => {
  //   // TODO: close the menu when click outside
  //   this.setState({
  //     boxToggle: false
  //   });
  // };

  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <nav
            className='nav'
            style={this.state.navBg ? { background: 'var(--white)' } : {}}>
            <div className='logo-div'>
              <img src={logo2} alt='LOGO!' />
            </div>
            <div className='center-nav-div'>
              <NavLink
                style={Object.assign(
                  this.props.page === 'HOME'
                    ? { textDecoration: 'underline' }
                    : {},
                  this.state.navBg ? { color: 'var(--black)' } : {}
                )}
                // className='text-black'
                to='/'
                // onClick={() => this.closeBox()}
              >
                HOME
              </NavLink>
              <div className='menu-link-div'>
                <NavLink
                  style={Object.assign(
                    this.props.page === 'MENU'
                      ? { textDecoration: 'underline' }
                      : {},
                    this.state.navBg ? { color: 'var(--black)' } : {}
                  )}
                  className='menu-hover'
                  to='/menu'
                  // onClick={() => this.setToggleBox()}
                >
                  MENU
                </NavLink>
                <DropDown />
              </div>
              <NavLink
                style={Object.assign(
                  this.props.page === 'RESERVATION'
                    ? { textDecoration: 'underline' }
                    : {},
                  this.state.navBg ? { color: 'var(--black)' } : {}
                )}
                // className='text-black'
                to='/reservation'
                // onClick={() => this.closeBox()}
              >
                RESERVATION
              </NavLink>
              <NavLink
                style={Object.assign(
                  this.props.page === 'LOGIN'
                    ? { textDecoration: 'underline' }
                    : {},
                  this.state.navBg ? { color: 'var(--black)' } : {}
                )}
                // className='text-black'
                to='/login'
                // onClick={() => this.closeBox()}
              >
                LOGIN
              </NavLink>
              <NavLink
                style={Object.assign(
                  this.props.page === 'SIGNUP'
                    ? { textDecoration: 'underline' }
                    : {},
                  this.state.navBg ? { color: 'var(--black)' } : {}
                )}
                // className='text-black'
                to='/signup'
                // onClick={() => this.closeBox()}
              >
                SIGNUP
              </NavLink>
              <NavLink
                style={Object.assign(
                  this.props.page === 'CONTACT'
                    ? { textDecoration: 'underline' }
                    : {},
                  this.state.navBg ? { color: 'var(--black)' } : {}
                )}
                // className='text-black'
                to='/contact'
                // onClick={() => this.closeBox()}
              >
                CONTACT
              </NavLink>
              <NavLink
                style={Object.assign(
                  this.props.page === 'CART'
                    ? { textDecoration: 'underline' }
                    : {},
                  this.state.navBg ? { color: 'var(--black)' } : {}
                )}
                // className='text-black'
                to='/cart'
                // onClick={() => this.closeBox()}
              >
                CART
              </NavLink>
            </div>

            <div
              className='menu-dropdown'
              style={
                this.state.boxToggle ? { display: 'grid' } : { display: 'none' }
              }>
              <div className='box-items'>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=1'>
                    Appetizer
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=5'>
                    Chicken Specialty{' '}
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=10'>
                    Dosai
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=6'>
                    Lamb Speciality
                  </a>
                </div>

                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=9'>
                    Rice Speciality
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=7'>
                    Seafood Specialties
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=2'>
                    Soup
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=3'>
                    Tandoor Bread
                  </a>
                </div>

                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=4'>
                    Tandoor Speciality
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu?category=8'>
                    Vegetarian Speciality
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu'>
                    North Indian Dinner/Thali
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu'>
                    Accompaniments
                  </a>
                </div>

                {/* </div> */}
                {/* <div className="box-item" > */}

                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu'>
                    Desserts
                  </a>
                </div>
                <div className='box-inner-item'>
                  {/* <img className='img11' src={logo2} alt='LOGO!' />{' '} */}
                  <a className='menu-list' href='/menu'>
                    Beverages
                  </a>
                </div>
              </div>
              <div className='fu-me'>
                <button id='full-menu-button' className='full-menu'>
                  <a className='menu-list' href='/menu'>
                    View Full Menu
                  </a>
                </button>
              </div>
            </div>
            <div className='social-icon-div'>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='http://www.facebook.com'
                style={this.state.navBg ? { color: 'var(--black)' } : {}}>
                <i className='fa fa-facebook'></i>
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='http://www.twitter.com'
                style={this.state.navBg ? { color: 'var(--black)' } : {}}>
                <i className='fa fa-twitter'></i>
              </a>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='http://www.instagram.com'
                style={this.state.navBg ? { color: 'var(--black)' } : {}}>
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
