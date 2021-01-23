import React from 'react';
import { Button} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.div`
display:flex;
flex-direction:column;
width:30vw;


`

const StyledButton = styled(Button)`
width:100%;
height:5vh;
margin:5vh;
`


const Nav = (props) => {




  return(
    <StyledMenu id='mainNav'>

      
          <NavLink to={'/home'}>
              <StyledButton>Home</StyledButton>
          </NavLink>
        
     

      
        
          <NavLink to='/create'>
            {!props.createMode ? 
                <StyledButton>Create Path</StyledButton> 
                :
                <StyledButton onClick={props.createPath}> Submit Path</StyledButton>
            }
          </NavLink>
        
        
      
      

      
        <NavLink to={`/profile/${props.user.user.id}`}>
          <StyledButton
            >My Profile
          </StyledButton>
        </NavLink>
      

      
        <StyledButton onClick = {props.logOutHandler}> Sign out</StyledButton>
      
    </StyledMenu>
  )
}

export default Nav
