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


const StyledContainer2=styled.div`

display:flex;
width:100%;
height:40%;
justify-content:flex-end
background-color:rgb(225, 173, 1, 0.8);




`
const StyledContainer3=styled.div`

display:flex;
width:100%;

height:100%
justify-content:space-between;
justify-content:flex-end;
background-color:rgb(225, 173, 1, 0.8);



`

const ButtonContainer=styled.div`
width:20vw;
display:flex;
justify-content:center;
align-items:center;

`

const StyledNavLink = styled(NavLink)`

display:flex;
alignItems:center;
justify-content:center;
`

const StyledButton = styled(Button)`
display:flex;
justify-content:center;


`


const HorizontalNav = (props) =>{


    return(
        <>  
        
        <StyledContainer>
            <StyledContainer2>
            <StyledContainer3>
        <StyledNavLink to={'/home'}>
            <ButtonContainer>
            {props.home? null :
                <StyledButton>Home</StyledButton>
            }
            </ButtonContainer>
        </StyledNavLink>


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
                     </StyledContainer3>
                </StyledContainer2>
             </StyledContainer>
         </>
    )
}

export default HorizontalNav