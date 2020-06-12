// import React, { Component } from 'react';

// class DropDown extends Component {
//     handleChange = ddl => {
//         this.props.onChange(ddl.value, ddl.options[ddl.selectedIndex].text)
//       };

//   render() {
//       console.log('hi', this.props);
//     return (
//         <select
//             id={this.props.id}
//             name={this.props.name}
//             onChange={(e) => this.handleChange(e.target)}
//             style={this.props.style}>
//                 { this.props.options.map((obj, i) => (
//                     <option key={i} value={obj.val} disabled={obj.disabled ? true : false}>{obj.text}</option>
//                 ))}

//         </select>
//         )
//     }
// }

// export default DropDown

import React from 'react';

const DropDown = () => {
  return (
    <div className='menu-dropdown'>
      <div className='box-items'>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=1'>
            Appetizer
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=5'>
            Chicken Specialty
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=10'>
            Dosai
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=6'>
            Lamb Speciality
          </a>
        </div>

        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=9'>
            Rice Speciality
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=7'>
            Seafood Specialties
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=2'>
            Soup
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=3'>
            Tandoor Bread
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=4'>
            Tandoor Speciality
          </a>
        </div>
        <div className='box-inner-item'>
          <a className='menu-list' href='/menu?category=8'>
            Vegetarian Speciality
          </a>
        </div>
        {/* <div className='box-inner-item'>
          <a className='menu-list' href='/menu'>
            North Indian Dinner/Thali
          </a>
        </div> */}
        {/* <div className='box-inner-item'>
          <a className='menu-list' href='/menu'>
            Accompaniments
          </a>
        </div> */}
        {/* <div className='box-inner-item'>
          <a className='menu-list' href='/menu'>
            Desserts
          </a>
        </div> */}
        {/* <div className='box-inner-item'>
          <a className='menu-list' href='/menu'>
            Beverages
          </a>
        </div> */}
      </div>
      <div className='full-menu-button-div'>
        <button id='full-menu-button' className='full-menu'>
          <a href='/menu'>
            View Full Menu
          </a>
        </button>
      </div>
    </div>
  );
};

export default DropDown;
