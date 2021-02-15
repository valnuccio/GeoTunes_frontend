import React from 'react';

import styled from 'styled-components';



const Title = styled.h1`
 
`





const Container2= styled.div`

display:flex;
flex-direction:row;
width:100vw;
align-items:top
`



const Container=styled.div`
display:flex;
flex-direction:row;
width:100vw;

`


const Header = ({page}) => {


  return(
    <>
    <Container2>
        
        <Container>
           <Title>GEOTUNES</Title>
          
         
          
        </Container>
    </Container2>
  </>
  )
  }

export default Header