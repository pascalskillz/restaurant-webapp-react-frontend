import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MyConsumer } from '../Context'
import '../styles/Navbar.css'
import logo2 from '../img/Logo2.png'



class Navbar extends Component {

  state = {
    boxToggle: false
  }

  setToggleBox = () => {
    this.setState({
      boxToggle: !this.state.boxToggle
    })
    // const menuBox = document.getElementById('menu-box');
    // if (this.state.boxToggle) {
    //   // menuBox.style.display = 'initial'
    //   menuBox.style.background = 'red'
    // }
    // else {
    //   // menuBox.style.display = 'none'
    //   menuBox.style.background = 'black'
    // }

    
  }
  
  render (){
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
            
            <NavLink className="menu" to="/menu"  onClick={() => this.setToggleBox()}>Menu </NavLink>
            
            <div id="menu-box" style={this.state.boxToggle ? {display: 'none'} : {display: 'initial'} }>

            <div class="subnav-content">
                <a href="/home">Apps</a>
                <a href="/Signup">Soups</a>
                <a href="/Reservation">Tandoor Breads</a>
                <a href="/home">Tandoori Specialties</a>
                <a href="/Signup">Chicken Specialties</a></div>
            <div class="subnav-content"> 
                <a href="/Reservation">Lamb Specialties</a>
                <a href="/home">Seafood Specialties</a>
                <a href="/Signup">Vegetarian Specialties</a>
                <a href="/Reservation">Rice Specialties</a>
                <a href="/home">Dosai</a> </div>
            <div class="subnav-content">
                <a href="/home">Uthapam</a>
                <a href="/home">North Indian Dinner/Thali</a>
                <a href="/home">Accompaniments</a>
                <a href="/home">Desserts</a>
                <a href="/home">Beverages</a></div>
            </div>
            
          



            <NavLink className="navbar-brand" to="/reservation">Reservation</NavLink>
            <NavLink className="navbar-brand" to="/login">Login</NavLink>
            <NavLink className="navbar-brand" to="/signup">SIGNUP</NavLink>
            <NavLink className="navbar-brand" to="/menu">test</NavLink>
          </div>
          
          
        </nav>
      )}</MyConsumer>
    )
  }
}

export default Navbar;



/*
<ul className="list"> 
                    <li>item1</li>
                    <li>item2</li>
                    <li>item3</li>
                    <li>item</li>
                </ul>*/