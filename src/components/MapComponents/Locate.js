import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
width:50px;
position:absolute;
bottom:7%;
right:2%;
z-index:1;
`


const Locate= ({panTo, options}) =>{
    return (
    <StyledButton className="locate" onClick={()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        }, () => null, options);
    }}>
        <img src="compass.svg" alt="compass - locate me"/>
    </StyledButton>
    );
} 

export default Locate