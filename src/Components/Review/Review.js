import React, { useContext } from 'react';
import { SelectContext } from '../../App';
import data from '../FakeData/fakedata';
import Headers from '../Header/Headers';
import HotelInfo from '../HotelInfo/HotelInfo';
import './Review.css'

const Review = () => {
    const [select,setSelect] = useContext(SelectContext)
    console.log(select);
    return (
        <div>          
            <Headers></Headers>
            <h4 className="font-weight-bold" style={{marginLeft:"115px"}}>Stay in {select}</h4>
            <div className="d-flex">
                <div className="booking-results">                
                    {
                        data.map(dt => {
                            if(dt.location===select){
                                return <HotelInfo key={dt.id} data={dt}></HotelInfo>
                            }
                        })
                    }
                </div>
                <div className='google-map'>
                {select === "Cox's Bazar" && <div className="mapouter"><div className="gmap_canvas"><iframe width="380" height="490" id="gmap_canvas" src="https://maps.google.com/maps?q=cox's%20bazar&t=&z=11&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe><a href="https://www.whatismyip-address.com/nordvpn-coupon/">nord vpn coupon code</a></div></div>}
                {select === "SreeMongol"&& <div className="mapouter"><div className="gmap_canvas"><iframe width="380" height="490" id="gmap_canvas" src="https://maps.google.com/maps?q=sreemongol&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe><a href="https://www.whatismyip-address.com/nordvpn-coupon/">nord vpn coupon code</a></div></div>}
                {select === "Sundorbon" && <div className="mapouter"><div className="gmap_canvas"><iframe width="380" height="490" id="gmap_canvas" src="https://maps.google.com/maps?q=bagerhat&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe><a href="https://www.whatismyip-address.com/nordvpn-coupon/">nord vpn coupon code</a></div></div>}
                </div>  
            </div>          
        </div>
    );
};

export default Review;