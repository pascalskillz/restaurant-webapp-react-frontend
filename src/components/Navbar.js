import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MyConsumer } from '../Context';
import DropDown from '../components/DropDown';
import '../styles/Navbar.css';
import newlogo from '../img/newlogo.png';

class Navbar extends Component {
  state = {
    // boxToggle: false,
    navBg: false,
    navOpen: true,
    page: '',
  };

  componentDidMount() {
    window.addEventListener('scroll', () => this.handleNavShowHide());
    this.setPageName();
    this.toggleNavbar();
  }

  setPageName = () => {
    let page = this.props.page;
    this.setState({
      page: page,
    });
  };

  handleNavShowHide = () => {
    // grab element passed as argument
    let element = document.getElementById('breakpoint');
    // if the element is not null ..
    if (element !== null) {
      // create an observable rectangle
      var rect = element.getBoundingClientRect();
      // if top of rectangle is 0
      // meaning if the distance from the
      // top of the viewport is 0
      // then set nag bg to true
      // else false
      if (rect.top <= 0) {
        this.setState({
          navBg: true,
        });
      } else {
        this.setState({
          navBg: false,
        });
      }
    }
  };

  toggleNavbar = () => {
    // console.log('toggle nav');
    let nav = document.querySelector('.nav');
    let burger = document.querySelector('#burger-toggle');
    this.setState({
      navOpen: !this.state.navOpen,
    });
    // console.log(this.state.navOpen);
    this.state.navOpen
      ? (nav.className += ' hide-nav')
      : (nav.className = 'nav');
    this.state.navOpen
      ? (burger.className = '')
      : (burger.className += 'active');
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
        {({ scrollIntoView }) => (
          <div className='navbar-js'>
            <div className='hamburger' onClick={() => this.toggleNavbar()}>
              <div className='lines'>
                <div id='burger-toggle'>
                  <span></span>
                </div>
                {/* <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div> */}
              </div>
            </div>
            <nav
              className='nav'
              style={Object.assign(
                this.state.navBg ? { background: 'var(--white)' } : {}
                // this.props.default === 'dark' ? { background: 'var(--dark)' } : {}
              )}>
              <div className='logo-div' onClick={() => scrollIntoView('.top')}>
                <img src={newlogo} alt='LOGO!' />
              </div>
              <div className='center-nav-div'>
                <NavLink
                  style={Object.assign(
                    this.state.page === 'HOME'
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
                      this.state.page === 'MENU'
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
                    this.state.page === 'RESERVATION'
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
                {/* <NavLink
                  style={Object.assign(
                    this.state.page === 'LOGIN'
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
                    this.state.page === 'SIGNUP'
                      ? { textDecoration: 'underline' }
                      : {},
                    this.state.navBg ? { color: 'var(--black)' } : {}
                  )}
                  // className='text-black'
                  to='/signup'
                  // onClick={() => this.closeBox()}
                >
                  SIGNUP
                </NavLink> */}
                <NavLink
                  style={Object.assign(
                    this.state.page === 'CONTACT'
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
                    this.state.page === 'CART'
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
            {/* </div> */}
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Navbar;
