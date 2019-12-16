import React, { Fragment } from 'react'
import  '../styles/ReservationDetails.css'


const ReservationDetails = () => {
    const {bookingDate,noOfPeople,tableSelected} = window.reservationDetails ? window.reservationDetails : [null, 0, ''];

    function getContactDetails()
    {
        return (
            <form>
                  <div className="form-group">
                    <label for="name">Name</label> :
                    <input type="text" name="name" id="name" />
                  </div>
                  <div className="form-group">
                    <label for="email">Email</label> :
                    <input type="email" name="email" id="email" />
                  </div>
                  <div className="form-group">
                    <label for="phone">Phone Number</label> : 
                    <input type="text" name="phone" id="phone" />
                  </div>
                  <input  style={{marginTop:"10px", width:"100%" }} type="submit" value="Send" className="btn btn-dark" />
                </form>
        )
    }
    return (
            window.reservationDetails ? 
            <Fragment><h2 style={{marginLeft:"30px"}}>Reservation Details :</h2>
            <div
            id='divReservationDetails'
            style={{
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
                <div>
            <div>No Of People : {`${noOfPeople}`}</div>
            <div>
              Date :{' '}
              {`${bookingDate.getDate()}/${bookingDate.getMonth()}/${bookingDate.getFullYear()}`}
            </div>
            <div>Time : {`${tableSelected}`}</div>
            </div>
            <div className='primaryPersonContact'>
                {getContactDetails()}
            </div>
          </div> </Fragment>: null
        
    )
}

export default ReservationDetails;