import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from 'nuka-carousel';
import '../styles/Main.css';
import img from '../img/jumbo-img.jpg';
class Main extends Component {
  render() {
    return (
      <MyConsumer>
        {({ state }) => (
          <div className='main-js'>
            <Navbar page='HOME' breakpoint='utensils'/>
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
                  // width='200px'
                  // height='200px'
                  autoplay={true}
                  autoplayInterval={500000}
                  wrapAround={true}
                  pauseOnHover={true}
                  renderCenterLeftControls={({ previousSlide }) => (
                    <div onClick={previousSlide}>
                      <i className='carousel-button fas fa-angle-left'></i>
                    </div>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <div onClick={nextSlide}>
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
                  />
                </Carousel>
              </div>
              <div className='utensils' id='section-divider'>
                <div className='utensil-container' id='utensils'>
                  <i className='fas fa-utensils'></i>
                </div>
              </div>
              <div className='jumbo-div'>
                <div className='jumbo-button-div'>
                  <a className='jumbo-button button' href='/menu'>
                    Check out the Menu
                  </a>
                  <a className='jumbo-button button' href='/reservation'>
                    Make a Reservation
                  </a>
                </div>
                <div className='bottom'>{new Date().toString()}</div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </MyConsumer>
    );
  }
}

export default Main;
