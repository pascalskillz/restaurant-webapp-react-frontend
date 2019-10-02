import React, { Component } from 'react';
import { MyConsumer } from '../Context'
import Carousel from 'nuka-carousel';
import '../styles/content.css'
import img from '../img/jumbo-img.jpg'
class Main extends Component {
  render() {
    return (
      <MyConsumer>
      {({  }) => (
        <div>

          <div className="jumbotron">
          
            <div className="jumbo-left">
              
            <img className="jumbo-img" src={img}/*"https://images.unsplash.com/photo-1466637574441-749b8f19452f"*/ alt="Static-Image"/>
            
                          </div>
                          
            <div className="jumbo-right">
              
              <div>

              </div>
              <div className="jumbo-text-large">
                
                Welcome to Tandoori Restauraunt
              </div>
              
              <div className="jumbo-button-div">
                <button className="jumbo-button button">Menu</button>
                <button className="jumbo-button button">Reservation</button>
              </div>
              <div className="jumbo-text-small">
                We serve only the finest Indian cuisine!
              </div>
            </div>
          </div>

          <div className="carousel-div">
            <Carousel 
              width="500px"
              autoplay='true'
              autoplayInterval='2000'
              wrapAround='true'
              pauseOnHover='true'
              renderCenterLeftControls={({ previousSlide }) => (
                <div onClick={previousSlide}><i class="carousel-button fas fa-chevron-circle-left"></i></div>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <div onClick={nextSlide}><i class="carousel-button fas fa-chevron-circle-right"></i></div>
              )}
              >
              <img src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb" alt='Slideshow Image1' />
              <img src="https://images.unsplash.com/photo-1460306855393-0410f61241c7" alt='Slideshow Image2' />
              <img src="https://images.unsplash.com/photo-1458642849426-cfb724f15ef7" alt='Slideshow Image3' />
            </Carousel>
          </div>
        </div>
      )}
    </MyConsumer>
    );
  }
}

export default Main;