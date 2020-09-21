import React from 'react';
import './hotelInfo.css'

const HotelInfo = (props) => {
    const {hotelNname,quantity,condition,cancel,star,price,location,photo} = props.data
    return (
        <div className="d-flex body">
            <img src={photo} alt=""/>
            <div className="detils">
                <h6 className="font-weight-bold">{hotelNname}</h6>                  
                <p><small>{quantity}</small></p>   
                <p><small>{condition}</small></p>   
                <p><small>{cancel}</small></p>   
                <div className="d-flex">
                <p><img src="https://i.ibb.co/wSKTN0B/star-1.png" alt=""/> <small className="mr-4 font-weight-bold">{star}</small></p>  
                <p><small><strong>{price}$/</strong>night</small></p>
                </div>               
            </div>
        </div> 
    );
};

export default HotelInfo;