import React, { Component, Fragment } from 'react';
import { MyConsumer } from '../Context';
import '../styles/content.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Reservation.css';
import DropDown from '../components/DropDown';
import {
  withRouter
} from 'react-router-dom';
import TableBooking from '../img/jumbo-img.jpg'

//import imgTableBanner from '../img/tableBanner.png'

class Reservation extends Component {
  state = {
    bookingDate: new Date(),
    timeSlot: [],
    noOfPeople: 1,
    selectedSlotVal: 6,
    tableSelected: ''
  };

  handleChange = date => {
    this.setState({
      bookingDate: date
    });
  };
  getZeroPadded = val => {
    if (val < 10) {
      return `0${val}`;
    }
    return `${val}`;
  };

  getTimeSlot = val => {
    const diffInSlot = 1; //change val when there is change in time slot
    const intervalBetHours = 4; //no of interval in 1 hours
    const intervalInMin = 60 / intervalBetHours; //no in min that define interval gap
    let incrMin = intervalInMin;
    let newTimeSlot = []; //array to store multiple result value (i.e 05:00, 05:15, 05:30)
    let hrVal = this.state.selectedSlotVal - diffInSlot; //(var to get Hr part)
    newTimeSlot.push(`${this.getZeroPadded(hrVal)} : 00`);    //getZeroPadded func define to get value as formatted for eg : 5 will return 05
    for (let i = 0; i < diffInSlot * intervalBetHours; i++) {
      if (incrMin == 60) {
        incrMin = 0;
        hrVal++;
      }
      let slotTime = `${this.getZeroPadded(hrVal)} : ${this.getZeroPadded(
        incrMin
      )}`;
      incrMin = incrMin + intervalInMin;
      newTimeSlot.push(slotTime);
    }

    return newTimeSlot;

    // let newTimeSlot = this.state.timeSlot.map(itm => {
    //   let time = itm.split(':');
    //   if(parseInt(time[1]) == 0)
    //   {
    //     return `${val} : ${time[1]}`;
    //   }
    //   return `${0 + (val-1)} : ${time[1]}`;
    // })

    // return newTimeSlot;
  };

  onTimeSelect = (val, text) => {
    // this.setState({timeSlot:this.getTimeSlot(val)});
    this.state.selectedSlotVal = val;
  };

  btnFindTableClick = () => {
    this.setState({
      timeSlot: this.getTimeSlot(this.state.selectedSlotVal),
      tableSelected: ''
    });
  };

  handlePeopleChange = evt => {
    // this.setState({noOfPeople:val});
    this.setState({
      noOfPeople: evt.target.validity.valid
        ? evt.target.value
        : this.state.noOfPeople
    });
  };

  onTableSelect = e => {
    this.setState({ tableSelected: e.target.innerHTML });
  };

  handleConfirmation = () => {
    if (
      window.confirm(
        'Are you sure you want to confirm a table on selected time slot?'
      )
    ) {
      const {bookingDate,noOfPeople,tableSelected} = this.state;
      window.reservationDetails = {bookingDate,noOfPeople,tableSelected};
      this.props.history.push('/reservation/details')
    }
  };
  componentDidMount() {
    this.setState({
      timeSlot: this.getTimeSlot(this.state.selectedSlotVal),
      tableSelected: ''
    });
  }
  render() {

    const timeOptions = [
      { val: 6, text: '5 to 6', disabled: false },
      { val: 7, text: '6 to 7', disabled: false },
      { val: 8, text: '7 to 8', disabled: false },
      { val: 9, text: '8 to 9', disabled: false },
      { val: 10, text: '9 to 10', disabled: false }
    ];

    const peopleOptions = [
      { val: 1, text: '1 Adult', disabled: false },
      { val: 2, text: '2 Adult', disabled: false },
      { val: 3, text: '3 Adult', disabled: false },
      { val: 4, text: '4 Adult', disabled: false },
      { val: 5, text: '5 Adult', disabled: false },
      { val: 6, text: '6 Adult', disabled: false }
    ];

    return (
      <Fragment>
        <img src={TableBooking} alt="Table Booking" style={{width:"100%", height:"300px", paddingLeft:"20px", paddingBottom:"20px"}}></img>
      <div
        id='divReservation'>
        <div id='divReservationOptions'>
          <div id='divDatePicker'>
            <DatePicker
              selected={this.state.bookingDate}
              onChange={this.handleChange}></DatePicker>
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
          </div>
          <div>
            <DropDown
              id='ddlTimeSlot'
              name='ddlTimeSlot'
              options={timeOptions}
              onChange={this.onTimeSelect}
              style={{ width: '100px' }}></DropDown>
            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
          </div>
          <div>
            {/* <DropDown id='ddlNoOfPeople' name='ddlNoOfPeople' options={peopleOptions} onChange={this.onPeopleSelect} style={{width:'100px'}}></DropDown> */}
            <input
              type='text'
              pattern='[1-9]'
              onInput={this.handlePeopleChange}
              value={this.state.noOfPeople}
              style={{ width: '90px', marginRight: '5px' }}
            />

            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
          </div>
        </div>
        <div className='divBtnTable'>
          <input
            type='button'
            value='&#8678;    Book Reservation'
            onClick={this.btnFindTableClick}
            className='btn btn-dark'></input>
        </div>
        <div id='divResult'>
          <div id='divResultContainer'>
            {this.state.timeSlot.map((val, i) => (
              <div
                className={
                  val == this.state.tableSelected ? 'selectedTable' : ''
                }
                key={i}
                onClick={this.onTableSelect}>
                {val}
              </div>
            ))}
          </div>
        </div>
        <div className='divBtnTable'>
          <input
            type='button'
            value='Confirm Table'
            className='btn btn-dark'
            disabled={this.state.tableSelected == ''}
            onClick={this.handleConfirmation}></input>
        </div>
        
      </div>
      </Fragment>
    ); // return
  } // render
} // component

export default withRouter(Reservation);
