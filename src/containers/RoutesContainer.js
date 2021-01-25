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

const Container1 = styled.div`
display:flex;
justify-content:center;
height:150vh;
position:relative;
// background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
`
const Image = styled.img`
z-index:1;
width:20vw;


`

const Container4=styled.div`

`

const Container2 = styled.div`
display:flex;
flex-direction:column;
position:absolute;
left:10px;
height:auto;
justify-content: flex-start;
`

const Container3 = styled.div`
position:absolute;
right:10px;
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
const Page = styled.div`
height:100%;
width:100%;
// position:relative;
// display:flex;
// flex-direction:column;
// justify-content:space-between;
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
        <Page>
        <Container1>
            <Container2>
                        <ImageContainer>
                                <Image src={mainLogo}></Image>
                        </ImageContainer>
            
            {updatedProfile? <Nav token={token} user={updatedProfile}/>:null}
            </Container2>


        <Container3>
            <HorizontalNav user={props.user} logOutHandler={props.logOutHandler}/>
            <ShowMap draggableVal={isDragable} getData={getData} routesContainer={true} showMarkers={markers} getCords={setNewArray}/>
        </Container3>


    </Container1>


    <Container4>
    <UpdateRouteToggleButton toggle={toggle} patch={patchRequest} routeID={props.routerID} user={props.user.user} cords={newArray} /> 
        <div id="box" style={{'max-height': '30vh', overflow: 'scroll'}}>
            <div id="panel"></div>
            <div id="other_info">

                <div id="other_info_bit">
                    <h2>Total Distance:</h2>
                        <p>{distance}</p>
                </div>
                <div id="other_info_bit">
                    <h2>Time to Walk:</h2>
                        <p>{`${parseFloat(distance) * 20}` } minutes</p>
                </div>
            </div>
        </div>
        
        
   
    { routeObj.playlist && localStorage.getItem('spotifyAuthToken') ? <GeoPlayer playlist = {routeObj.playlist}/> : <SpotifyAuthButton header="Connect to Spotify to View Playlist" redirectUri={`http://localhost:3001/routes`}/>}
    </Container4>
    </Page>
   
    )
}


export default RoutesContainer
