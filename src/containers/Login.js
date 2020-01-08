import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import Jumbo from '../components/Jumbo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import '../styles/Main.css'

class Login extends Component {
  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <div className='login-js'>
            <Navbar page='LOGIN' />
            <Jumbo
              src='https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
              alt='Login Picture'
              text='Login'
            />
            <div className='Container'>
              <h1 className='signin-text-primary'>Sign In</h1>
              <p className='lead1'>Sign into Your Account</p>
              <form className='signin-form'>
                <div className='signin-form-group'>
                  <input
                    type='email'
                    placeholder='Email-Address'
                    name='email'
                    required
                  />
                  <br />
                  <br />
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    required
                  />
                </div>
                <input
                  type='submit'
                  className='btn btn-Primary'
                  value='Login'
                />
              </form>
              <p className='my-1'>
                Don't have an account? <a href='Signup.js'>Sign Up</a>
              </p>
            </div>
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Login;
