import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SelectContext } from '../../App';
import './Booking.css'

const Booking = () => {
    const [select,setSelect] = useContext(SelectContext)
    let history = useHistory();
    const bookingHandeler =() => {
        history.push("/review");
    }
    return (
        <div className="bookings">
            <p><small><span className="font">Origin</span></small></p>
            <div className="value">
                <h6>Dhaka</h6>
            </div>
            <p><small><span className="font">Destination</span></small></p>
            <div className="value">
            <h6>{select}</h6>
            </div>
            
            <div className="form">
                <div>
                    <p><small><span className="font">From</span></small></p>
                    <input className="value" type="date" name="" id=""/>
                </div>
                <div className="ml-3">
                <p><small><span className="font">To</span></small></p>
                    <input className="value" type="date" name="" id=""/>
                </div>
            </div>
            <div className="start_booking">
            <h5><span onClick={bookingHandeler}>Start Booking</span></h5>
            </div>
        </div>
    );
};

export default Booking;