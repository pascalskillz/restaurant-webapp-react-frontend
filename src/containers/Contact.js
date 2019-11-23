import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import LMap from './LMap'
import '../styles/content.css'
import '../styles/Contact.css'

class Contact extends Component {
  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <div id="">
            <div class="head">
              <h2 className="m-heading">Contact Us</h2>
              <p>We welcome your suggestions. Please send us your questions, feedback and comments.</p>
            </div>
            <div id="contact">
              <div className="contact-form bg-primary p-2">
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
                <div class="map-title">
                  Tandoor Location
                </div>
                <LMap class="map-canvas"/>

                <div className="address">
                  <p> Tandoor India Cuisuine 1610 NJ-35, Ocean Township, NJ 07712, </p>
                  <p> +1 732-531-1944 </p>
                  <p> Tandorr@gmail.com </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Contact;