import React from "react";
// import { NavLink } from "react-router-dom";
import { MyConsumer } from "../Context";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <MyConsumer>
      {({ state }) => (
        <footer role="contentinfo"> 
            <div class="container"> 
                <div class="column"> 
                    <h4 id="logo-footer"><a href="/">Hours of Operation</a></h4> 
                    <div class="store-hours"> <p><b>DINNER:</b> 5 P.M. to 10 P.M., Mon. - Sun.</p> </div> 
                    <div class="store-location"> <p> 1610 NJ-35, <br/> Ocean Township, NJ 07712 </p> <a target="_blank" href="https://www.google.com/maps/place/Tandoor+India/@40.256184,-74.0436427,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2262385a1f0c9:0x34f35c2126cbf381!8m2!3d40.256184!4d-74.041454" class="map-it">Map It</a> </div> 
                    <div class="payment-info"> <p>Eat in or take out. We accept Credit Cards, Debit Cards, and cold-hard cash.</p> </div> 
                </div> 
            </div> 
            <ul class="footer-social"> <li class="facebook"><a href="https://www.facebook.com/" target="_blank">facebook</a></li> <li class="twitter">
              <a href="https://twitter.com/" target="_blank">twitter</a></li> 
              <li class="youtube"><a href="https://www.youtube.com/" target="_blank">youtube</a></li> 
              <li class="instagram"><a href="https://instagram.com/" target="_blank">instagram</a></li> 
              </ul> 
              <ul class="website-info"> <li class="website"> <a>Website by Monmouth Valley </a></li> <li class="copyright"><a>© 2020 Tandoor</a></li> </ul>
        </footer>
      )}
    </MyConsumer>
  );
};

export default Footer;



