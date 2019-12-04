import React from "react";
// import { NavLink } from "react-router-dom";
import { MyConsumer } from '../Context'
import '../styles/Footer.css'
import '../styles/content.css';

// image imports
import discover from '../img/discover.jpg'
import master from '../img/master.jpg'
import visa from '../img/visa.jpg'
import facebook from '../img/facebook.jpg'
import google from '../img/google.jpg'
import ins from '../img/ins.jpg'
import twitter from '../img/twitter.jpg'

const Footer = () => {
  return (
    <MyConsumer>{({ state }) => (
      <footer className="footer">
        <div className="table">
        <div className="cell">
            <h1>Support</h1>
            <div>LEGAL</div>
            <div>PRIVACY PLICY</div>
            <div>TERMS OF USE</div>
            <h1>Plan your own order</h1>
            <div className="bg-orange">PLAN YOUR OWN ORDER-PICK-UP</div>
        </div>
        <div className="cell">
            <h1>WAYS YOU CAN PAY </h1>
            <div>
              <img className="icon" src={discover} alt="discover"></img>
              <img className="icon" src={master} alt="master"></img>
              <img className="icon" src={visa} alt="visa"></img>

            </div>
            <h1>PLAN YOUR OWN ORDER FOLLOW US</h1>
            <div>
              <img className="icon" src={facebook} alt="facebook"></img>
              <img className="icon" src={twitter} alt="twitter"></img>
              <img className="icon" src={ins} alt="ins"></img>
              <img className="icon" src={google} alt="google"></img> 
              </div>
        </div>
        <div className="cell">
            <h1>CONTACT US</h1>
            <div>ADDRESS</div>
            <div>NJ</div>
            <div>USA</div>
            <div>+(888)888-8888</div>
            <div>Tandorr.gmail.com</div>
        </div>
        <div className="cell">
          <button className="btn" onClick={()=>{window.location.href='/menu';}}>order now</button>
        </div>
        </div>

      </footer>
    )}</MyConsumer>
  )
}

export default Footer;

