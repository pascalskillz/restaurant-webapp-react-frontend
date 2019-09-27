import React from "react";
import { NavLink } from "react-router-dom";
import { MyConsumer } from '../Context'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <MyConsumer>{({  }) => (
      <footer className="navbar">
        <div class="table">
        <div class="cell">
            <h1>Support</h1>
            <div>LEGAL</div>
            <div>PRIVACY PLICY</div>
            <div>TERMS OF USE</div>
            <h1>Plan your own order</h1>
            <div class="bg-orange">PLAN YOUR OWN ORDER-PICK-UP</div>
        </div>
        <div class="cell">
            <h1>WAYS YOU CAN PAY </h1>
            <div></div>
            <h1>PLAN YOUR OWN ORDER FOLLOW US</h1>
            <div></div>
        </div>
        <div class="cell">
            <h1>CONTACT US</h1>
            <div>ADDRESS</div>
            <div>NJ</div>
            <div>USA</div>
            <div>+(888)888-8888</div>
            <div>Tandorr.gmail.com</div>
        </div>
        </div>

      </footer>
    )}</MyConsumer>
  )
}

export default Footer;

