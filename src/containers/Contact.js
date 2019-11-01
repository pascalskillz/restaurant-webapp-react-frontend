import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import LMap from './LMap'
import '../styles/content.css'
import '../styles/Contact.css'

class Contact extends Component {
  render() {
    return (
      <MyConsumer>
      {({  }) => (
        <div id="contact">
        <div className="contact-form bg-primary p-2">
          <h2 className="m-heading">Contact Us</h2>
          <div className="address">
          Tandoor India Cuisuine <br/>
            1610 NJ-35, <br/>Ocean Township, <br/>NJ 07712, 
            <br/>Located in: Orchard Plaza<br/>United States<br/>
            +1 732-531-1944 <br/>
            Tandorr@gmail.com
          </div>
          <p>Please use the form below to contact us</p>
          <form>
            <div className="form-group">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Enter Name" />
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label for="phone">Phone Number</label>
              <input type="text" name="phone" id="phone" placeholder="Enter Phone Number" />
            </div>
            <div className="form-group">
              <label for="message">Message</label>
              <textarea name="message" id="message" placeholder="Enter Message"></textarea>
            </div>
            <input type="submit" value="Send" className="btn btn-dark" />
          </form>
        </div>
        <div className="map">
          <LMap />
        </div>
      </div>
      )}
    </MyConsumer>
    );
  }
}

export default Contact;