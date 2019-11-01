import React, { Component } from "react";

const MyContext = React.createContext();
export class MyProvider extends Component {
  state = {
    isAdminLoggedIn: false,
    invalidLogin: false,
  }

  componentDidMount() {

  }

  login = (e, username, cookieData) => {
    e.preventDefault();
    if (username === 'admin'){
      this.setState({ isAdminLoggedIn: true })
      let d = new Date();
      d.setTime(d.getTime() + (5*60*60*1000));
      let expires = d.toUTCString();
      document.cookie = `username=${cookieData}; expires=${expires}`
      console.log(document.cookie)
    }
    else {
      this.setState({ invalidLogin: true })
      setTimeout(() => { this.setState({ invalidLogin: false }) }, 3000)
    }
    
  }

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
  
  render () {
    return (
      <MyContext.Provider value={{
        //state
        state: this.state,
        isAdminLoggedIn: this.state.isAdminLoggedIn,
        invalidLogin: this.state.invalidLogin,

        //functions
        login: this.login,
        addCookie: this.addCookie,
        checkCookie: this.checkCookie,

      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const MyConsumer = MyContext.Consumer;