import React, {useState, useEffect} from 'react';
import { Button, List, Icon, Segment, Header} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useHistory } from "react-router-dom"

const StyledMenu = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width:20vw;
margin-top:40px;
margin-bottom:40px;
margin-left:5px;
`

const ListContainer=styled.div`

`

const StyledButton = styled(Button)`
width:100%;

margin:5%;
`

const StyledNavLink = styled(NavLink)`



`

const EmptyContainer = styled.div`
background:rgb(245,245,245);
height:10vh;
border-radius:5px;
display:flex;
justify-content:center;
padding:5px;
align-items:center;
`

const Container=styled.div`
max-height:30vh;
overflow:scroll;
background:rgb(245, 245, 245);
height:25vh;
`


const Nav = (props) => {

const [distance, setDistance] = useState(null)
const [duration, setDuration] = useState(null)
let history = useHistory();

useEffect(()=>{
    

    setDistance(props.distance)
    setDuration(props.duration)
},[props.duration, props.distance])


 
  
    
      
    


  return(
     
    <StyledMenu id='mainNav'>


       
         
        
      
        {props.page !== "show"?

            <>
        <div>
          
                     <Segment inverted>
                        <Header as='h2' icon='map pin' content='My Routes' style={{display:'flex', justifyContent:'center', width:'100%'}}/>
                    </Segment>


              {props.user.user.play_routes.length >0? (
                    
                    <Container>
                    <List>
                            
                                {

                                        props.user.user.play_routes.map( (r, i) => {
                                        return(
                                            <ListContainer key={i} className='ui segment'  style={{width:'100%',  padding:'3px'}}>
                                                <List.Item id={`${r.id}`} key={`${r.id}`} onClick={(e) => props.previewRoute(e.target.id)} style={{width:'100%', height:'100%', display:'flex'}}>
                                                    <Icon id={`${r.id}`} key={`${r.id}`}name='headphones' style={{width:'25%'}}/>
                                                    <List.Content style={{width:'75%', display:'flex', justifyContent:'space-between'}}>
                                                        <List.Header id={`${r.id}`} key={`${r.id}`}>{r.name}</List.Header>
                                                        <Button onClick={()=>
                                                            history.push(`/routes/${r.id}`)
                                                           
                                                            } style={{width:'25%', display:'flex', justifyContent:'center'}}>Go</Button>
                                                    </List.Content>
                                                </List.Item>
                                            </ListContainer>
                                        ) 
                                    })
                                }
                            


                    </List>
                    </Container>) 
                    : 
                    
                    (
                        <EmptyContainer>
                    <h4>Looks like you don't have any routes yet</h4>
                    </EmptyContainer>
                    )
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
                        <Container>
                     <List>
                    
                    {
                            
                        props.user.user.routes.map( (r, i) => {
                            return(
                                <ListContainer key={i} className="ui segment" style={{width:'100%',  padding:'3px'}}>
                                <List.Item id={`${r.id}`} key={`${r.id}`}onClick={(e) => props.previewRoute(e.target.id)} style={{width:'100%', height:'100%', display:'flex'}}>
                                    <Icon id={`${r.id}`} name='headphones' style={{width:'25%'}}/>
                                    <List.Content style={{width:'75%', display:'flex', justifyContent:'space-between'}}>
                                        <List.Header id={`${r.id}`} key={`${r.id}`}>{r.name}</List.Header>
                                        <Button onClick={()=>history.push(`/routes/${r.id}`)} style={{width:'25%', display:'flex', justifyContent:'center'}}>Go</Button>
                                     </List.Content>
                                </List.Item>
                                </ListContainer>
                            
                            ) 
                        })
                    }
                    
                    </List>
                    </Container>):(
                        <EmptyContainer>
                    <h4> Looks like you don't have any favorite routes yet!</h4>
                    </EmptyContainer>)}
       
       </> :
        <>
        {/* <StyledNavLink to={'/home'}>
            <StyledButton>Home</StyledButton>
        </StyledNavLink> */}
         <Segment inverted>
         <Header as='h2' icon='map pin' content='Total Distance' />
     </Segment>
        <EmptyContainer>
     <h4>{distance} miles</h4>  
     </EmptyContainer>  


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
<EmptyContainer>
<h4>{duration} minutes walking</h4>
</EmptyContainer>
</>
       
       
       }

       
    </StyledMenu>
   
   
  )
}

export default Nav
