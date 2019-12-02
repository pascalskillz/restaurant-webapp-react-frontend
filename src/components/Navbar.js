
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

  closeBox = () => {  // close the menu when click outside
    this.setState({
      boxToggle: false
    });
  };
  

  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <nav className='navbar'>
            <div className='logo-icon'>
              <div className='logo-div'>
                <img src={logo2} alt='LOGO!' />
              </div>
              <div className='icon-div'>
                <a target='_blank' rel="noopener noreferrer" href='http://www.facebook.com'>
                  <i className='fa fa-facebook'></i>
                </a>
                <a target='_blank' rel="noopener noreferrer" href='http://www.twitter.com'>
                  <i className='fa fa-twitter'></i>
                </a>
                <a target='_blank' rel="noopener noreferrer" href='http://www.instagram.com'>
                  <i className='fa fa-instagram'></i>
                </a>
              </div>
            </div>
            <div className='dropdown-div'>
              <NavLink className='navbar-brand' to='/' 
              onClick={() => this.closeBox()}>HOME</NavLink>
              <NavLink
                className='drop-menu'
               to='#'
                onClick={() => this.setToggleBox()}>
                Menu
              </NavLink> 
              <NavLink
                className='navbar-brand'
                to='/reservation'
                onClick={() => this.closeBox()}>
                Reservation
              </NavLink> 

              <NavLink className='navbar-brand' to='/login' 
              onClick={() => this.closeBox()}>Login</NavLink>
              <NavLink className='navbar-brand' to='/signup'
              onClick={() => this.closeBox()}>SIGNUP</NavLink>
              <NavLink className='navbar-brand' to='/contact'onClick={() => this.closeBox()}
              >Contact</NavLink>
              <NavLink className='navbar-brand' to='/cart'onClick={() => this.closeBox()} >Cart</NavLink>
            </div>

            <div id="menu-box" style={this.state.boxToggle ? {display: 'initial'} : {display: 'none'} }>
            <div className="box-item" >
             
            <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=1">Appetizer</a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=5">Chicken Specialty </a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=10">Dosai</a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=6">Lamb Speciality</a></div>
           </div>

            <div className="box-item" >
            
            <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=9">Rice Speciality </a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=7">Seafood Specialties </a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=2">Soup</a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=3">Tandoor Bread</a></div>

            </div>
            <div className="box-item" >
             
            <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=4">Tandoor Speciality</a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu?category=8">Vegetarian Speciality</a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu">North Indian Dinner/Thali</a></div> 
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu">Accompaniments </a></div> 

            </div>
             <div className="box-item" >
              
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu">Desserts </a></div>
             <div><img className='img11' src={logo2} alt='LOGO!'/> <a className="menu-list" href="/menu">Beverages</a></div>
             
             </div>
             <div className="fu-me"><button className="full-menu"><a className="menu-list" href="/menu"> View Full Menu </a> </button></div>
            </div>
          
          </nav>
        )}
      </MyConsumer>
    );
  }
}

export default Navbar;