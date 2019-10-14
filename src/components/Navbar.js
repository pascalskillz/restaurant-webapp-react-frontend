import React from "react";
import { NavLink } from "react-router-dom";
import { MyConsumer } from '../Context'
import '../styles/Navbar.css'
import logo2 from '../img/Logo2.png'

const Navbar = () => {
  return (
    <MyConsumer>{({  }) => (
      <nav className="navbar">
        <div className="logo-icon">
          <div className="logo-div">
            
              <img src={logo2} alt="LOGO!"/>
          
          </div>
          <div className="icon-div">
          <a target="_blank" href="http://www.facebook.com"><i className="fa fa-facebook"></i></a>
          <a target="_blank" href="http://www.twitter.com"><i className="fa fa-twitter"></i></a>
          <a target="_blank" href="http://www.instagram.com"><i className="fa fa-instagram"></i></a>
          </div>
        </div>
        <div className="dropdown-div">
          <NavLink className="navbar-brand" to="/">HOME</NavLink>
          <NavLink className="navbar-brand" to="/menu">Menu</NavLink>
          <NavLink className="navbar-brand" to="/reservation">Reservation</NavLink>
          <NavLink className="navbar-brand" to="/login">Login</NavLink>
          <NavLink className="navbar-brand" to="/signup">SIGNUP</NavLink>
        </div>
      </nav>
    )}</MyConsumer>
  )
}

export default Navbar;

