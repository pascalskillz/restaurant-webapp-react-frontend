import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import { Redirect } from 'react-router-dom';
import '../styles/Admin.css'

class Admin extends Component {
  state = {
    username: ''
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  setRedirectHome = () => {
    this.setState({
      redirectHome: true
    })
  }

  renderRedirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <MyConsumer>
      {({ isAdminLoggedIn, invalidLogin, login }) => (
        <div className='admin-container'>
          {this.renderRedirectHome()}
          <div className="admin-inner">
            {
              isAdminLoggedIn ?

              <div className="admin-console">
                <button className='button home-button' onClick={this.setRedirectHome}><i className='fas fa-home'></i> Home</button>
                Logged In
              </div>

              : 

              <div className='admin-login-form'>
                <button className='button home-button' onClick={this.setRedirectHome}><i className='fas fa-home'></i> Home</button>
                <form className='login-form'>
                  <label htmlFor='username' className='username-label'>Login</label>
                  <input
                    type='text'
                    name='username'
                    className='username-input'
                    // value={this.state.username}
                    onChange={this.handleInputChange}
                  />
                  <button type='submit' className='button login-button' onClick={(e) => login(e, this.state.username)}><i className='fas fa-check-circle'></i></button>
                </form>
                <small id='login-error'>
                  { invalidLogin ? 'Incorrect Username' : <br/> }
                </small>
              </div>
            }
          </div>
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Admin;