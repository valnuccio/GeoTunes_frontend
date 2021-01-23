import React from 'react';


const Locate= ({panTo, options}) =>{
    return (
    <button className="locate" onClick={()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        }, () => null, options);
    }}>
        <img src="compass.svg" alt="compass - locate me"/>
    </button>
    );
} 

export default Locate