import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
width:50px;
position:absolute;
bottom:7%;
left:2%;
z-index:1;
`

const Locate= ({panTo, options}) =>{

    const errorCallback=()=> {
      console.log(navigator.GeolocationPositionError.code)
      };


    return (
    <StyledButton className="locate" onClick={
        
        ()=>{

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    panTo({
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                })
                  }, error => {
                      console.error(error)
                  })
                  
            }
        }
    //     ()=>{
    //     navigator.geolocation.getCurrentPosition((position)=>{
    //         console.log(position)
            
    //         panTo({
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //         });
    //     }, () => null, options);
    // }
    
    
    }>
        <img src="compass.svg" alt="compass - locate me"/>
    </StyledButton>
    );
} 

export default Locate