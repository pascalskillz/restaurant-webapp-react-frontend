import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import '../styles/cPanel.css'

class ControlPanel extends Component {

  // componentDidMount() {
  //   this.checkCookie()
  // }

  // getCookie = (cname) => {
  //   var name = cname + "=";
  //   var decodedCookie = decodeURIComponent(document.cookie);
  //   var ca = decodedCookie.split(';');
  //   for(var i = 0; i <ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }

  // checkCookie = () => {
  //   var username = this.getCookie("username");
  //   if (username != "") {
  //    alert("Welcome again " + username);
  //   } else {
  //     console.log('Cookie Error')
  //   }
  // }


  render() {
    return (
      <MyConsumer>
      {({ }) => (
        <div className='cpanel-container'>
          cPanel
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default ControlPanel;