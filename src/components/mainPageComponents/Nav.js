import React, {useState, useEffect} from 'react';
import { Button, List, Icon, Segment, Header} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SpotifyList from 'styled-components';

const StyledMenu = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width:20vw;
margin-top:40px;
margin-bottom:40px;
`

const ListContainer=styled.div`
overflow:scroll;
`

const StyledButton = styled(Button)`
width:100%;

margin:5%;
`

const StyledNavLink = styled(NavLink)`



`



const Nav = (props) => {

const [distance, setDistance] = useState(null)

useEffect(()=>{

},[props.duration])


  return(
     
    <StyledMenu id='mainNav'>


       
         
        
      
        {props.page !== "show"?

            <>
        <div>
          
                     <Segment inverted>
                        <Header as='h2' icon='map pin' content='My Routes' />
                    </Segment>


              {props.user.user.play_routes.length >0? (
                    
                    
                    <List>
                            <div className="ui raised segments">
                                {

                                        props.user.user.play_routes.map( (r, i) => {
                                        return(
                                            <ListContainer key={i} className="ui segment">
                                                <List.Item id={`${r.id}`} key={`${r.id}`} onClick={(e) => props.previewRoute(e.target.id)} key={r.id} >
                                                    <Icon id={`${r.id}`} key={`${r.id}`}name='headphones' />
                                                    <List.Content>
                                                        <List.Header id={`${r.id}`} key={`${r.id}`}>{r.name}</List.Header>
                                                    
                                                    </List.Content>
                                                </List.Item>
                                            </ListContainer>
                                        ) 
                                    })
                                }
                            </div>


                    </List>) 
                    : 
                    
                    (<h3>No routes yet</h3>)
                }
        </div>



            {/* <StyledNavLink to={'/create'}>
              {!props.createMode ? 
                  <StyledButton>Create Path</StyledButton> 
                  :
                  <StyledButton onClick={props.createPath}> Submit Path</StyledButton>
              }
            </StyledNavLink> */}

            
            <Segment inverted>
                <Header as='h2' icon='heartbeat' content='Favorite Routes' />
            </Segment>
                    {props.user.user.routes.length>0? ( 
                     <List>
                    <div class="ui raised segments">
                    {
                            
                        props.user.user.routes.map( (r, i) => {
                            return(
                                <ListContainer key={i} class="ui segment">
                                <List.Item id={`${r.id}`} key={`${r.id}`}onClick={(e) => props.previewRoute(e.target.id)} key={r.id} >
                                    <Icon id={`${r.id}`} name='headphones' />
                                    <List.Content>
                                        <List.Header id={`${r.id}`} key={`${r.id}`}>{r.name}</List.Header>
                                    
                                     </List.Content>
                                </List.Item>
                                </ListContainer>
                            
                            ) 
                        })
                    }
                    </div>
                    </List>):(

                    <p> Looks like you don't have any routes Favorited yet!</p>)}
       
       </> :
        <>
        {/* <StyledNavLink to={'/home'}>
            <StyledButton>Home</StyledButton>
        </StyledNavLink> */}
         <Segment inverted>
         <Header as='h2' icon='map pin' content='Total Distance' />
     </Segment>

     <p>{props.distance} miles</p>    


<StyledNavLink to={'/create'}>
{!props.createMode ? 
   null
   :
   <StyledButton onClick={props.createPath}> Submit Path</StyledButton>
}
</StyledNavLink>


<Segment inverted>
 <Header as='h2' icon='heartbeat' content='Total Duration' />
</Segment>
<p>{props.duration} minutes walking</p>
</>
       
       
       }

       
    </StyledMenu>
   
   
  )
}

export default Nav
