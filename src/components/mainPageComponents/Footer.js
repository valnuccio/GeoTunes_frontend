import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
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