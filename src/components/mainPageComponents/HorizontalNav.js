import React from 'react';

import 'react-spotify-auth/dist/index.css';
import { NavLink } from 'react-router-dom';
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

const StyledNavLink = styled(NavLink)`



`

const StyledButton = styled(Button)`
width:100%;

margin:5%;
`

const HorizontalNav = (props) =>{


    return(
        <>  
        
        <StyledContainer>
            {props.home? null :
        <StyledNavLink to={'/home'}>
            <StyledButton>Home</StyledButton>
        </StyledNavLink>}


         <StyledNavLink to={'/create'}>
             < ButtonContainer>
              {!props.createMode ?
              
                  <StyledButton>Create Path</StyledButton> 
                  :
                  null
               
               }
             </ButtonContainer>
            </StyledNavLink>
        
        
        
        
                     {/* <h3>{props.user.user.name}</h3> */}
                                    <ButtonContainer>
                                        <Button onClick = {props.logOutHandler}> Sign out</Button>
                                     </ButtonContainer> 
             </StyledContainer>
         </>
    )
}

export default HorizontalNav