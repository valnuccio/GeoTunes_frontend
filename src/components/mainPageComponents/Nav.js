import React from 'react';
import { Button, List, Icon, Segment, Header} from 'semantic-ui-react';
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


// console.log(props.user)

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

        <div>
          





            <Segment inverted>
                        <Header as='h2' icon='map pin' content='My Routes:' />
                    </Segment>
              {props.user.user.play_routes.length >0? (
                    <List>
                    <div className="ui raised segments">
                    {

                        props.user.user.play_routes.map( (r, i) => {
                            return(
                                <div key={i} className="ui segment">
                                <List.Item id={`${r.id}`} key={`${r.id}`} onClick={(e) => props.previewRoute(e.target.id)} key={r.id} >
                                    <Icon id={`${r.id}`} key={`${r.id}`}name='headphones' />
                                    <List.Content>
                                        <List.Header id={`${r.id}`} key={`${r.id}`}>{r.name}</List.Header>
                                      
                                     </List.Content>
                                </List.Item>
                                </div>
                            ) 
                        })
                    }
                    </div>
                    </List>) : (<h3>No routes yet</h3>)}
            </div>

      

            
                  <Segment inverted>
                        <Header as='h2' icon='heartbeat' content='Favorite Routes' />
                    </Segment>
                    {props.user.user.routes.length>0? (                    <List>
                    <div class="ui raised segments">
                    {
                            
                        props.user.user.routes.map( (r, i) => {
                            return(
                                <div key={i} class="ui segment">
                                <List.Item id={`${r.id}`} key={`${r.id}`}onClick={(e) => props.previewRoute(e.target.id)} key={r.id} >
                                    <Icon id={`${r.id}`} name='headphones' />
                                    <List.Content>
                                        <List.Header id={`${r.id}`} key={`${r.id}`}>{r.name}</List.Header>
                                    
                                     </List.Content>
                                </List.Item>
                                </div>
                            
                            ) 
                        })
                    }
                    </div>
                    </List>):
                    <p> Looks like you don't have any routes Favorited yet!</p>}








       


      
        <StyledButton onClick = {props.logOutHandler}> Sign out</StyledButton>


    </StyledMenu>
  )
}

export default Nav
