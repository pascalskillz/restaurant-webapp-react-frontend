<<<<<<< HEAD
import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from 'nuka-carousel';
import '../styles/Main.css';
import img from '../img/jumbo-img.jpg';
=======
import React, { Component } from "react";
import { MyConsumer } from "../Context";
import Carousel from "nuka-carousel";
import "../styles/content.css";
import img from "../img/jumbo-img.jpg";
>>>>>>> 6decb5b53837afe5d96bb4fe2cd52a05a2ce4b40
class Main extends Component {
  render() {
    return (
      <MyConsumer>
        {({ scrollIntoView }) => (
          <div className='main-js top'>
            <Navbar page='HOME' />
            <div className='main-div'>
              <div className='carousel-div'>
                <div className='carousel-text'>
                  <div className='jumbo-text-large'>
                    Welcome to Tandoor Restauraunt
                  </div>
                  <div className='jumbo-text-small'>
                    We serve only the finest Indian cuisine
                  </div>
                </div>
                <Carousel
<<<<<<< HEAD
                  // width='200px'
                  // height='200px'
                  autoplay={true}
                  autoplayInterval={7000}
                  wrapAround={true}
                  pauseOnHover={true}
                  renderCenterLeftControls={({ previousSlide }) => (
                    <div onClick={previousSlide}>
                      <i className='carousel-button fas fa-angle-left'></i>
=======
                  width="1150px"
                  height="350px"
                  autoplay="true"
                  autoplayInterval="2000"
                  wrapAround="true"
                  pauseOnHover="true"
                  renderCenterLeftControls={({ previousSlide }) => (
                    <div onClick={previousSlide}>
                      <i className="carousel-button fas fa-chevron-circle-left"></i>
>>>>>>> 6decb5b53837afe5d96bb4fe2cd52a05a2ce4b40
                    </div>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <div onClick={nextSlide}>
<<<<<<< HEAD
                      <i className='carousel-button fas fa-angle-right'></i>
                    </div>
                  )}>
                  <img
                    src='https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
                    alt='Slideshow Image1'
                  />
                  <img
                    src='https://images.unsplash.com/photo-1460306855393-0410f61241c7'
                    alt='Slideshow Image2'
                  />
                  <img
                    src='https://images.unsplash.com/photo-1458642849426-cfb724f15ef7'
                    alt='Slideshow Image3'
=======
                      <i className="carousel-button fas fa-chevron-circle-right"></i>
                    </div>
                  )}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb"
                    alt="Slideshow Image1"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1460306855393-0410f61241c7"
                    alt="Slideshow Image2"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1458642849426-cfb724f15ef7"
                    alt="Slideshow Image3"
>>>>>>> 6decb5b53837afe5d96bb4fe2cd52a05a2ce4b40
                  />
                </Carousel>
              </div>
              <div className='utensils' id='section-divider'>
                <div
                  className='utensil-container'
                  id='breakpoint'
                  onClick={() => scrollIntoView('.main-content-div')}>
                  <i className='fas fa-utensils'></i>
                </div>
<<<<<<< HEAD
              </div>
              <div className='main-content-div'>
                <div className='main-content-button-div'>
                  <a className='main-content-button button' href='/menu'>
                    Check out the Menu
                  </a>
                  <a className='main-content-button button' href='/reservation'>
                    Make a Reservation
                  </a>
=======

                <div className="jumbo-right">
                  <div className="jumbo-details">
                    <div className="jumbo-text-large">
                      Welcome to Tandoori Restauraunt
                    </div>
                    <div className="jumbo-button-div">
                      <a className="jumbo-button button" href="/menu">
                        Menu
                      </a>
                      <a className="jumbo-button button" href="/reservation">
                        Reservation
                      </a>
                    </div>
                    <div className="jumbo-text-small">
                      We serve only the finest Indian cuisine
                    </div>
                    <div className="bottom">{new Date().toString()}</div>
                  </div>
>>>>>>> 6decb5b53837afe5d96bb4fe2cd52a05a2ce4b40
                </div>
                <div className='bottom'>{new Date().toString()}</div>
              </div>
            </div>
<<<<<<< HEAD
            <Footer />
=======
>>>>>>> 6decb5b53837afe5d96bb4fe2cd52a05a2ce4b40
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Main;
