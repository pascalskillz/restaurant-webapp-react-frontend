import React, { Component } from "react";

const MyContext = React.createContext();
export class MyProvider extends Component {
  state = {

  }

  componentDidMount() {

  }

  render () {
    return (
      <MyContext.Provider value={{
        //state
        state: this.state,

        //functions
        isWorking: this.isWorking,

      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const MyConsumer = MyContext.Consumer;