import React from 'react';
import {Icon} from 'semantic-ui-react';
import styled from 'styled-components';
import {Globe2Outline} from '@styled-icons/evaicons-outline/'






const LoginHeader = () => {

  
const Title = styled.h1`
 
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
  return(
    <>
    <Container2>
        <Icon/>
        <Container>
          
          <Title>GEOTUNES</Title>
         
          
        </Container>
    </Container2>
  </>
  )
  }

export default LoginHeader