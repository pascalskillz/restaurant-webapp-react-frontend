import React, { Component } from 'react';
import { MyConsumer } from '../Context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from 'nuka-carousel';
import '../styles/Main.css';
import img1 from '../img/slide1.jpg';
import img2 from '../img/slide2.jpg';
import img3 from '../img/slide3.jpg';
import menu from '../img/menu1.jpg';

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
                    Welcome to <br/>
                    TANDOOR
                    
                  </div>
                  <div className='jumbo-text-small'>
                  INDIAN RESTAURANT
                    </div>
                  <div className='main-content-button-div'>
                  {/* <a className='main-content-button button' href='/menu'>
                    Menu
                  </a> */}
                  <a className='main-content-button button' href='/reservation'>
                  FIND A TABLE
                  </a>
                  <a className='main-content-button button' href='/menu'>
                  VISIT MENU
                  </a>
                  
                </div>
                {/* <div className='main-content-div'>
                <div className='main-content-button-div'>
                  <a className='main-content-button button' href='/menu'>
                    Check out the Menu
                  </a>
                  <a className='main-content-button button' href='/reservation'>
                    Make a Reservation
                  </a>
                </div>
                <div className='bottom'>{new Date().toString()}</div>}
               
              </div> */}
                
                </div>
                <Carousel
                  // width='200px'
                  // height='200px'
                  autoplay={true}
                  autoplayInterval={7000}
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
                    src={img1}
                    // 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
                    alt='Slideshow Image1'
                  />
                  <img
                    src={img2}
                    // 'https://images.unsplash.com/photo-1460306855393-0410f61241c7'
                    alt='Slideshow Image2'
                  />
                  <img
                    src={img3}
                    // 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7'
                    alt='Slideshow Image3'
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
              </div>
              
            <div className='main-content-div'>
        


            <div className="row">
            <div className="column1">
              <div className="aboutus">About us 

              <h6>Tandoor India offers delicious dining, takeout and delivery to Oakhurst, NJ.
              Tandoor India is a cornerstone in the Oakhurst community and has been recognized for its outstanding Indian cuisine,
              excellent service and friendly staff.
              Our Indian restaurant is known for its modern interpretation of classic dishes and its insistence on only using high quality
             fresh ingredients.</h6>
              </div>

              <button className="button-menu"><span ><a  className="button-menu"  href='/menu'> Menu</a> </span></button>
              {/* <h6>Tandoor India offers delicious dining, takeout and delivery to Oakhurst, NJ.
              Tandoor India is a cornerstone in the Oakhurst community and has been recognized for its outstanding Indian cuisine,
              excellent service and friendly staff.
              Our Indian restaurant is known for its modern interpretation of classic dishes and its insistence on only using high quality
             fresh ingredients.</h6> */}
            </div>
            <div className="column2"> I am gonna update this middle soon!!
            <div class="gallery">
  <img className="img-gallery" src={img1} alt="flex-gallery" />
  <img className="img-gallery"  src={img1} alt="flex-gallery" />
  <img className="img-gallery"  src={img1} alt="flex-gallery" />
</div>
            </div>
           
            <div className="column3">
              
             </div>
            </div> 

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
