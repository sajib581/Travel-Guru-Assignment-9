import React from 'react';

const ShowOption = (props) => {
    const {choiseHandeler,coxBazarHandeler,sreemongolHandeler,sundorbonHandeler}= props
    return (
        <div>
            <div className="d-flex container catagories flex-row mb-3">
        <div onClick={()=>choiseHandeler("Cox's Bazar")} onMouseEnter={coxBazarHandeler} className="ml-3 bd-highlight choice">
          <img src="https://i.ibb.co/GRWMsw6/cox-bazar.png" alt=""/>
          <h4 className="location-name">COX'S BAZAR</h4>          
        </div>
        <div onClick={()=>choiseHandeler("SreeMongol")} onMouseEnter={sreemongolHandeler} className="ml-3 bd-highlight choice">
          <img src="https://i.ibb.co/yhVYzQZ/Sreemongol.png" alt=""/>
          <h4 className="location-name">SREEMONGOL</h4>      
        </div>
        <div onClick={()=>choiseHandeler("Sundorbon")} onMouseEnter={sundorbonHandeler} className="ml-3 bd-highlight choice">
          <img src="https://i.ibb.co/yRcZBLK/sundorbon.png" alt=""/>
          <h4 className="location-name">SUNDORBON</h4>      
        </div>
      </div>
        </div>
    );
};

export default ShowOption;