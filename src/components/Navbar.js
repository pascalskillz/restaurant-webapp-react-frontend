import React from "react";
import { NavLink } from "react-router-dom";
import { MyConsumer } from '../Context'
import '../styles/Navbar.css'
import logo from '../img/logo.jpg'
const Navbar = () => {
  return (
    <MyConsumer>{({  }) => (
      <nav className="navbar">
        <div className="logo-icon">
          <div className="logo-div">
            <img src={logo} alt="LOGO!"/>
          </div>
          <div className="icon-div">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
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

