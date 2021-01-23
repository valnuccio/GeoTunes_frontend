import React from 'react';
import { Button} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.div`
display:flex;
flex-direction:column;
width:30vw;
margin-top:5vh;
`

const ButtonContainer = styled.div`
width:80%;
height:10vh;


`


const Nav = (props) => {




  return(
    <StyledMenu id='mainNav'>
        {props.page!=="home"? 
          <ButtonContainer>
            <NavLink to={'/home'}>
                <Button>Home</Button>
            </NavLink>
        </ButtonContainer>:null}

      
        <ButtonContainer>
            <NavLink to='/create'>
              {!props.createMode ? 
                  <Button>Create Path</Button> 
                  :
                  <Button onClick={props.createPath}> Submit Path</Button>
              }
            </NavLink>
        </ButtonContainer>
        
      
      

      <ButtonContainer>
          <NavLink to={`/profile/${props.user.user.id}`}>
            <Button
              >My Profile
            </Button>
          </NavLink>
      </ButtonContainer>

      <ButtonContainer>
        <Button onClick = {props.logOutHandler}> Sign out</Button>
      </ButtonContainer>

    </StyledMenu>
  )
}

export default Nav
