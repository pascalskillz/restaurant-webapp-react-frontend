import React, { Component } from "react";

const MyContext = React.createContext();
export class MyProvider extends Component {
  state = {
    isAdminLoggedIn: false,
    invalidLogin: false,
  }

  componentDidMount() {

  }

  adminLogin = (e, username, cookieData) => {
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
  
  render () {
    return (
      <MyContext.Provider value={{
        //state
        state: this.state,
        isAdminLoggedIn: this.state.isAdminLoggedIn,
        invalidLogin: this.state.invalidLogin,

        //functions
        adminLogin: this.adminLogin,
        addCookie: this.addCookie,
        checkCookie: this.checkCookie,

      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const MyConsumer = MyContext.Consumer;