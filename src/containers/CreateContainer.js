import React, {useState, useEffect} from 'react';

import Nav from '../components/mainPageComponents/Nav';


import mainLogo from '../../src/images/mainLogo.png'
import { playroutes as playRoutes } from '../railsserver';
import SpotifyAuthScreen from '../containers/SpotifyAuthenticationScreen';

import Footer from '../components/mainPageComponents/Footer'
import "@reach/combobox/styles.css";

import CreateMap from './maps/CreateMap'
import UserSpotPlaylists from '../components/mainPageComponents/UserSpotPlaylists';
import HorizontalNav from '../components/mainPageComponents/HorizontalNav';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Button } from 'semantic-ui-react';


const StyledNavLink = styled(NavLink)`



`


const ButtonContainer=styled.div`
width:20vw;
margin-left:7vw;

`
const StyledButton = styled(Button)`
width:100%;

margin:5%;
`

const Container1 = styled.div`
display:flex;
justify-content:center;
position:relative;
width:100%;
height:75%;

// background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
`

const Image = styled.img`
z-index:1;
width:20vw;


`
const Page = styled.div`
display:flex;
width:1005;
flex-direction:column;
height:100%;
`
const ImageContainer= styled.div`
background:black;
display:flex;
justify-content:center;
height:30vh;
width:25vw;
border-bottom-right-radius:3%;
border-top-right-radius:2%;
`

const Container2 = styled.div`
display:flex;
flex-direction:column;
position:absolute;
left:10px;
height:auto;
justify-content: flex-start;
width:25vw;


`

const Container3 = styled.div`
position:absolute;
right:10px;
`


const CreateContainer = (props) => {

    const [name, setName] = useState(null);
    const [markers, setMarkers] = useState([]);
   
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [spotToken, setSpotToken] = useState(localStorage.getItem('spotifyAuthToken'));

    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')



    useEffect(() => {
        setSpotToken(localStorage.getItem('spotifyAuthToken'));
        document.body.style.height="1600px"
    }, [])

    
    
    


    const createPath = () => {

        
       
            let playRouteData = {
                playRouteData: markers,
                user: props.user.user,
                playlist: selectedPlaylist,
                plName: name
            }
            
        fetch(playRoutes, {
            method: 'POST',
            headers: {
                
                Accepts: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(playRouteData)
        })
        .then()
        .then( () => {
            
            alert('Route Created')
            props.history.push('/home')
            //window.location.reload()
        })
    
    }

    const getData = (obj) => {
        
        let x= distanceMath(obj)
        let y= durationMath(obj)
        setDistance(x)
        setDuration(y)
        
    
   
       }
   



    const distanceMath = (obj) => {
        if (obj.routes[0].legs.length>1){
        
        let z= obj.routes[0].legs.map((ele) => parseFloat(ele.distance.text))
        return z.reduce((a,b) => a+b)
        } else {
          
            return parseFloat(obj.routes[0].legs[0].distance.text)
        }
     
    }

    const durationMath = (obj)=>{
        if (obj.routes[0].legs.length>1){
            let z= obj.routes[0].legs.map((ele) => parseFloat(ele.duration.text))
            return z.reduce((a,b) => a+b)

        } else {
            return parseFloat(obj.routes[0].legs[0].duration.text)
        }
     
    }


    



  
   
    return (
        <>
        <Page>
        <Container1>
           {spotToken? 
           <>
           <Container2>

               <ImageContainer>
                    <Image src={mainLogo}></Image>
                </ImageContainer>


                <Nav user={props.user} createMode={true} logOutHandler={props.logOutHandler} createPath={createPath} />
                
                <UserSpotPlaylists spotToken={spotToken} setSelectedPlaylist={(e)=>setSelectedPlaylist(e)} name={name} setName={(e)=>setName(e)}/> 
                {markers.length > 0 && name && selectedPlaylist?
       
                    
       <StyledNavLink to={'/create'}>
             < ButtonContainer>
              
                  <StyledButton onClick={()=>createPath()}> Submit Path</StyledButton>
               
               
             </ButtonContainer>
            </StyledNavLink>
        
        : <h3> Chart a course and Select a Playlist to Continue!</h3>}
           </Container2>

           <Container3>

                <HorizontalNav home={false} logOutHandler={props.logOutHandler} createPath={createPath} createMode={true}/>
             
            
                <CreateMap setMarkers={(e)=>setMarkers(e)} markers={markers} getData={getData}/>
            
            </Container3>


            {/* <UserSpotPlaylists spotToken={spotToken} setSelectedPlaylist={(e)=>setSelectedPlaylist(e)} name={name} setName={(e)=>setName(e)}/> */}
           
            </>
            :
            <SpotifyAuthScreen/>
       } 
       </Container1>   
       
       
       
       
        </Page>
        <Footer/>
        </>
    );
}









export default CreateContainer