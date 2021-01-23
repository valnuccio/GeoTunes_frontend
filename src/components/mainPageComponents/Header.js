import React from 'react';

import styled from 'styled-components';
import {Globe2Outline} from '@styled-icons/evaicons-outline/'


const Title = styled.h1`
 
`

const Title2 = styled.h2`
`

const Container2= styled.div`
display:flex;
flex-direction:row;
width:100vw;
align-items:top
`

const Icon = styled(Globe2Outline)`
  height:100px;
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
        {/* <Icon/> */}
        <Container>
          {page ==="login"? <Title>GEOTUNES</Title> : <Title2>GEOTUNES</Title2>}
          
         
          
        </Container>
    </Container2>
  </>
  )
  }

export default Header