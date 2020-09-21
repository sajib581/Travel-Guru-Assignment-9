import React, { useContext, useState } from 'react';
import './Choice.css'
import { ChoiseContext, SelectContext } from '../../App';
import ShowOption from '../ShowOptions/ShowOption';
import Booking from '../Booking/Booking';

const Choice = () => {
  const [choise, setChoise] = useState({
    name : "COX'S BAZAR",
    description : "Cox's Bazar (Bengali: কক্সবাজার, pronounced [kɔksbadʒaɾ]) is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it is infamous for the largest refugee camp in the world. It is located 150 km (93 mi) south of the divisional headquarter city of Chittagong"
  })
  const coxBazarHandeler = () => {
    const data = {
      name : "COX'S BAZAR",
      description : "Cox's Bazar is the prime beach and tourist town in Bangladesh, situated alongside the beach of the Bay of Bengal, beside the Indian ocean, having unbroken 120 Kilometer golden sand beach, reachable through motor transport alongside the wavy water . This town is situated in the Chittagong Division in south-eastern Bangladesh, beside 'Myanmar (Burma)'"
    }
    setChoise(data)
  }
  const sreemongolHandeler = () => {
    const data = {
      name : "SREEMONGOL",
      description : "Sreemangal is situated in Moulvibazar district in sylhet division. Sreemangal is an Upazila. It is famous for tea garden. Rain all time occurs here. Nature has adorned sreemangal with green tress. Its natural scenery is very charming. It soothes one’s eyes. Birds are twittering always here. The first tea garden in Bangladesh which names “Malni chho ra tea garden” is here"
    }
    setChoise(data)
  }
  const sundorbonHandeler = () => {
    const data = {
      name : "SUNDORBON",
      description : "The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal. It spans from the Hooghly River in India's state of West Bengal to the Baleswar River in Bangladesh"
    }
    setChoise(data)
  }
  
  const [select,setSelect] = useContext(SelectContext)
  const choiseHandeler = (name) => {
    console.log("select name",name);
    setSelect(name)
  }
  const bookingHandeler = () => {
    if(choise.name){
      choiseHandeler(choise.name)
    }
  }
  return (
    <div className="homeView">
        <div className="details">
        <h1><span className="title">{choise.name}</span></h1>
        <p><span className="text">{choise.description}</span></p>
        {!select && <button onClick={bookingHandeler} className="booking">Booking</button>}
        </div>
        <div className="carts">
        {
          !select && <ShowOption    
                      choiseHandeler={choiseHandeler}   
                      coxBazarHandeler={coxBazarHandeler}
                      sreemongolHandeler={sreemongolHandeler}
                      sundorbonHandeler={sundorbonHandeler}
                    ></ShowOption>
        }
        {
          select && <Booking></Booking>
        }
        </div>
    </div>     
  );
};

export default Choice;