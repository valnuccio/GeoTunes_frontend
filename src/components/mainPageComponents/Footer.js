import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

background: radial-gradient(circle, rgba(121,121,121,0.8393732492997199) 0%, rgba(0,0,0,1) 100%);
position:absolute;
bottom:0%;
width:100%;
height:15vh;
display:flex;
flex-direction:column;
align-items:center;

`

const Footer = () =>{
return(
    <>
    <Container>
        <p> This application is a demo</p>
        <p> For more information contact: val.nuccio@gmail.com</p>
    </Container>

    </>
)

}

export default Footer