import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import LMap from './LMap';
import Jumbo from '../components/Jumbo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import '../styles/Main.css'
import '../styles/Contact.css';
import ZapierForm from 'react-zapier-form' ;// Zapier URL 

import Recaptcha from 'react-recaptcha';

class Contact extends Component {
   constructor(props){
   super(props)
   this.handleSend= this.handleSend.bind(this);
   this.rechaptchaLoaded= this.rechaptchaLoaded.bind(this);
   this.verifyCallback =this.verifyCallback.bind(this);
   this.state={
     isVerified: false
   }
 }
 rechaptchaLoaded(){
console.log('Rechaptcha is loaded')
 }
  handleSend(){
    if (this.state.isVerified) {
      alert('You have successfully sent');
    }else{
      alert('Please verify that you are a human');
    }
  }
  verifyCallback(response){
if (response){
  this.setState({
    isVerified : true
  })
}
  }
  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <div className='contact-js top'>
            <Navbar page='CONTACT' />
            <Jumbo
              src='https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
              alt='Contact Picture'
              text='Contact Us'
            />
            
            <div id='contact'>
              <div className='contact-form bg-primary p-2'>
              <ZapierForm action='https://hooks.zapier.com/hooks/catch/6694312/omo9b1g/' methos="POST">
                  
                {({ error, loading, success }) => {
                                  return (
                                  <div>
                {!success && !loading &&
                
               <div className='form-group'>
                <h5 className="text-center w-responsive mx-auto mb-5"><i>
              Please do not hesitate to contact us directly.
              </i></h5>
                <div><label for='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Enter Name'
                      required //Validation
                    />
                </div>
                   <div><label for='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='example@example.com'
                      required
                    />
                   </div>
                  
                   <div><label for='phone'>Phone Number</label>
                    <input
                      type='tel'
                      name='phone'
                      id='phone'
                      placeholder='Enter Phone Number'
                      required
                    />
                   </div>
                   <div><label for='message' required>Message</label>
                    <textarea
                      name='message'
                      id='message'
                      placeholder='Enter Message'>
                    </textarea>
                   </div>

                   <div className='convert' onClick={this.handleSend}>
                   <input type='submit' value='Send'  className='btn btn-dark'  /></div>
                   <Recaptcha
    sitekey="6Ld8peIUAAAAAKiyelcRWBofd48HzfMYWZq72qkp"
    render="explicit"
    theme='light'
    onloadCallback={this.rechaptchaLoaded}
    verifyCallback={this.verifyCallback}
  />
              </div>
           
            }
              {loading && <div>Loading...</div>}
              {error && <div>Something went wrong. Please try again.</div>}
              {success && <div><h5>Thank you for contacting us! Our team will come back to you within a matter of hours to help you.</h5></div>}
        </div>
    )
  }}
            </ZapierForm>
               
          </div>
              
              
              
              
            <div className='map'>
                  <LMap class='map-canvas' />
            </div>
              
          </div>
          <Footer />
        </div>
      )}
    </MyConsumer>
  );
}
}

export default Contact;
