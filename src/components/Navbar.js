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

            <NavLink className="menu" to="/menu">Menu 

                <ul className="list"> 
                    <li>item1</li>
                    <li>item2</li>
                    <li>item3</li>
                    <li>item</li>
                </ul>
            </NavLink>
            <NavLink className="navbar-brand" to="/reservation">Reservation</NavLink>
            <NavLink className="navbar-brand" to="/login">Login</NavLink>
            <NavLink className="navbar-brand" to="/signup">SIGNUP</NavLink>
            <NavLink className="navbar-brand" to="/menu" onClick={() => this.setToggleBox()}>test</NavLink>
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
        </div>
        <div className="dropdown-div">
          <NavLink className="navbar-brand" to="/">HOME</NavLink>
          <NavLink className="navbar-brand" to="/menu">Menu</NavLink>
          <NavLink className="navbar-brand" to="/reservation">Reservation</NavLink>
          <NavLink className="navbar-brand" to="/login">Login</NavLink>
          <NavLink className="navbar-brand" to="/signup">SIGNUP</NavLink>
          <NavLink className="navbar-brand" to="/contact">CONTACT</NavLink>
        </div>
      </nav>
    )}</MyConsumer>
  )
=======
          <div id="menu-box" style={this.state.boxToggle ? {display: 'none'} : {display: 'initial'} }>
=======
          <div id="menu-box" style={this.state.boxToggle ? {display: 'initial'} : {display: 'none'} }>
>>>>>>> e48398b79ab3bede8231a2ff24d2c46facc28755
            fake box
          </div>
          
        </nav>
      )}</MyConsumer>
    )
  }
>>>>>>> 164d12511ccd8c49dd2434266705b4e18b3326d3
}

export default Navbar;

