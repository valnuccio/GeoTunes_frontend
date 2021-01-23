import React from 'react';
import { Button} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width:30vw;
height:20vh;
margin-top:40px;
`



const StyledButton = styled(Button)`
width:100%;

margin:5%;
`

const StyledNavLink = styled(NavLink)`


width:100%;
`

const Nav = (props) => {




  return(
    <StyledMenu id='mainNav'>
        {props.page!=="home"? 
          
            <StyledNavLink to={'/home'}>
                <StyledButton>Home</StyledButton>
            </StyledNavLink>
:null}

      
        
            <StyledNavLink to={'/create'}>
              {!props.createMode ? 
                  <StyledButton>Create Path</StyledButton> 
                  :
                  <StyledButton onClick={props.createPath}> Submit Path</StyledButton>
              }
            </StyledNavLink>

        
      
      

      
          <StyledNavLink to={`/profile/${props.user.user.id}`}>
            <StyledButton
              >My Profile
            </StyledButton>
          </StyledNavLink>


      
        <StyledButton onClick = {props.logOutHandler}> Sign out</StyledButton>


    </StyledMenu>
  )
}

export default Nav
