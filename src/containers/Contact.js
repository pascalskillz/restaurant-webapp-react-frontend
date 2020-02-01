import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import LMap from './LMap';
import Jumbo from '../components/Jumbo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import '../styles/Main.css'
import '../styles/Contact.css';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone:'',
      message: ''
    }
  }

   //Handler function for the contact form that will send HTTP requests to the API
   handleSubmit(e) {
    e.preventDefault();
    console.log('it works')
    fetch('http://localhost:4001',{ // link needs to make sure @Paschal 
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      ).then(
      (response) => (response.json())
       ).then((response)=>{
      if (response.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      }else if(response.status === 'fail'){
        alert("Message failed to send.")
      }
    })
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
            <div class='head'>
              <h2 className='m-heading'>Contact Us</h2>
              <p>
                We welcome your suggestions. Please send us your questions,
                feedback and comments.
              </p>
            </div>
            <div id='contact'>
              <div className='contact-form bg-primary p-2'>
                <p>Please use the form below to contact us</p>
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                  <div className='form-group'>
                    <label for='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={this.state.name} onChange={this.onNameChange.bind(this)}
                      placeholder='Enter Name'
                    />
                  </div>
                  <div className='form-group'>
                    <label for='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      aria-describedby="emailHlep"
                      value={this.state.email} onChange={this.onEmailChange.bind(this)}
                      placeholder='Enter Email'
                    />
                  </div>
                  <div className='form-group'>
                    <label for='phone'>Phone Number</label>
                    <input
                      type='tel'
                      name='phone'
                      id='phone'
                      pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                      value={this.state.phone} onChange={this.onPhoneChange.bind(this)}
                      placeholder='Enter Phone Number'
                    />
                  </div>
                  <div className='form-group'>
                    <label for='message'>Message</label>
                    <textarea
                      name='message'
                      id='message'
                      value={this.state.message} onChange={this.onMessageChange.bind(this)}
                      placeholder='Enter Message'></textarea>
                  </div>
                  <input type='submit' value='Send' className='btn btn-dark' />
                </form>
              </div>
              <div className='map'>
                <div class='map-title'>Tandoor Location</div>
                <LMap class='map-canvas' />

                <div className='address'>
                  <p>
                    {' '}
                    Tandoor India Cuisuine 1610 NJ-35, Ocean Township, NJ 07712,{' '}
                  </p>
                  <p> +1 732-531-1944 </p>
                  <p> Tandorr@gmail.com </p>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
  onNameChange(event) {
    this.setState({name: event.target.value})
    }
  
    onEmailChange(event) {
    this.setState({email: event.target.value})
    }
    onPhoneChange(event) {
    this.setState({phone: event.target.value})
    }
  
    onMessageChange(event) {
    this.setState({message: event.target.value})
    }
  

}

export default Contact;
