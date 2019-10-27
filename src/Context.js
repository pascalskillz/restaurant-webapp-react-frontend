import React, { Component } from "react";

const MyContext = React.createContext();
export class MyProvider extends Component {
  state = {
    isAdminLoggedIn: false,
    invalidLogin: false,
  }

  componentDidMount() {

  }

  login = (e, username) => {
    e.preventDefault();
    if (username === 'admin'){
      this.setState({ isAdminLoggedIn: true })
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
        login: this.login,

      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const MyConsumer = MyContext.Consumer;