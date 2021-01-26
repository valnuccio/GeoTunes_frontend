import React from 'react';

import 'react-spotify-auth/dist/index.css';

import "@reach/combobox/styles.css";
import styled from 'styled-components';



import { Button } from 'semantic-ui-react';

const StyledContainer=styled.div`

display:flex;
width:100%;
height:20vh;
justify-content:flex-end;


`
const ButtonContainer=styled.div`
width:20vw;
margin-left:7vw;

`

const HorizontalNav = (props) =>{


    return(
        <>  <StyledContainer>
                     {/* <h3>{props.user.user.name}</h3> */}
                                    <ButtonContainer>
                                        <Button onClick = {props.logOutHandler}> Sign out</Button>
                                     </ButtonContainer> 
             </StyledContainer>
         </>
    )
}

export default HorizontalNav