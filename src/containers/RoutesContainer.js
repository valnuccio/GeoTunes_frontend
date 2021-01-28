import React, {useState, useEffect } from 'react';
import {playroutes} from "../railsserver";
import ShowMap from './maps/ShowMap';
import GeoPlayer from '../components/mainPageComponents/GeoPlayer';
import useToggle from 'react-use-toggle';
import Nav from '../components/mainPageComponents/Nav';
import UpdateRouteToggleButton from '../components/mainPageComponents/UpdateRouteToggleButton';
import SpotifyAuthButton from '../components/mainPageComponents/SpotifyAuthButton';
import { getUser} from '../railsserver';
import styled from 'styled-components';
import mainLogo from '../../src/images/mainLogo.png';
import HorizontalNav from '../components/mainPageComponents/HorizontalNav';
import DirectionsRendered from '../components/MapComponents/DirectionsRendered';
import Footer from '../components/mainPageComponents/Footer';



const Container1 = styled.div`
display:flex;
justify-content:center;
position:relative;
width:100%;

// background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
`
const Image = styled.img`
z-index:1;
width:20vw;


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
max-width: 70vw;

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


const RoutesContainer = (props) =>{
    const [token, setToken] = useState(null)
    const [updatedProfile, setUpdatedProfile] = useState(null);
    
    const prepPinRender = (prd) => {
        return prd.pins.map(pin => ({lat: pin.lat, lng: pin.lng}))
    }
   
    const [routeObj, setRouteObj] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [newArray, setNewArray]= useState([]);
    const [distance, setDistance] = useState('')

    const getData = (obj) => {
     console.log('getData:', obj)
     setDistance(obj.routes[0].legs[0].distance.text)
     console.log(obj.routes[0])
    }



    const patchRequest = () => {
        
        let options={
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                'headers':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            body: JSON.stringify({cords: newArray})
        }

        fetch(playroutes + props.routerID, options).then().then()

    }

    
    const [routeName, setRouteName] = useState('');
    useEffect(
        ()=> {
                localStorage.setItem('currentRoute', props.routerID);
                fetch(playroutes+props.routerID, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then(res=>res.json())
                .then(route =>{
                    console.log(route)
                    let cords = prepPinRender(route);
                    setRouteObj(route);
                    setMarkers(cords);
                    setRouteName(route.name)
                })  
        },[props.routerID])

        useEffect(() => {
            setToken(localStorage.getItem('spotifyAuthToken'));
            fetch(getUser, {
              method: 'GET',
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          .then( r => r.json())
          .then(foundProfile => { 
              console.log(foundProfile)
              setUpdatedProfile(foundProfile) 
          })
          document.body.style.height="1400px"
          } 
      
         
          , [token])
    
    const [isDragable, toggle] = useToggle(false);

    return (
        <>

         <Container1> 
                
                {token?
                
                 
                        <>
                        <Container2>
                            <ImageContainer>
                                <Image src={mainLogo}></Image>
                            </ImageContainer>
                            {updatedProfile && routeObj? <Nav page={'show'} token={token} selected={routeObj} createMode={false}  user={updatedProfile} distance={distance}/> :null}
                           {/* {routeObj.playlist && token? <SpotifyList token={props.token} selected={routeObj}/>:null} */}
                           
                           <UpdateRouteToggleButton toggle={toggle} patch={patchRequest} routeID={props.routerID} user={props.user.user} cords={newArray} /> 
                           {routeObj.playlist? <GeoPlayer playlist = {routeObj.playlist}/>:null}
                         </Container2> 

                         
                          
                            <Container3>
                                <HorizontalNav user={updatedProfile} logOutHandler={props.logOutHandler}/>
                                
                                    <ShowMap home={false} showMarkers={markers} getData={()=>null} getCords={() => null} />
                                    <DirectionsRendered/>
                            </Container3>
                            
                            </>
              
                   
                
            

         :


                    null



            }
            
           
            </Container1>
            <Footer/>
        </>
//         <>
//         <Container1>
//             <Container2>
//                         <ImageContainer>
//                                 <Image src={mainLogo}></Image>
//                         </ImageContainer>
                    
//                     {updatedProfile? <Nav token={token} user={updatedProfile} page={"show"}/>:null}

//                     <Box>
//                         <UpdateRouteToggleButton toggle={toggle} patch={patchRequest} routeID={props.routerID} user={props.user.user} cords={newArray} /> 
//                     </Box>

//                     <Box>
//                         <DirectionsInfo distance={distance}/>
//                         { routeObj.playlist && localStorage.getItem('spotifyAuthToken') ? <GeoPlayer playlist = {routeObj.playlist}/> : <SpotifyAuthButton header="Connect to Spotify to View Playlist" redirectUri={`http://localhost:3001/routes`}/>}
//                     </Box>
   


//             </Container2>


//         <Container3>
//             <HorizontalNav user={props.user} logOutHandler={props.logOutHandler}/>
//             <ShowMap draggableVal={isDragable} getData={getData} routesContainer={true} showMarkers={markers} getCords={setNewArray}/>
//             <DirectionsRendered distance={distance}/>
//         </Container3>


        

//     </Container1>
//     <Footer/>  


    
    
   
    
//   </>
   
    )
}


export default RoutesContainer
