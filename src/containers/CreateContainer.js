import React, { useState, useEffect } from 'react';
import SpotifyList from '../components/mainPageComponents/SpotifyList'
import ViewMap from './maps/ViewMap';
import 'react-spotify-auth/dist/index.css';
import mainLogo from '../../src/images/mainLogo.png';
import SpotifyAuthScreen from './SpotifyAuthenticationScreen';
import "@reach/combobox/styles.css";
import styled from 'styled-components';
import Nav from '../components/mainPageComponents/Nav';
import ShowMap from '../containers/maps/ShowMap'
import HorizontalNav from '../components/mainPageComponents/HorizontalNav'
import { getUser, playroutes } from '../railsserver';
import Footer from '../components/mainPageComponents/Footer';
import CreateMap from '../containers/maps/CreateMap'
import UserSpotPlaylists from '../components/mainPageComponents/UserSpotPlaylists';
import { playroutes as playRoutes } from '../railsserver'


// Styled Components
const Image = styled.img`
z-index:1;
width:20vw;


`
 const Page = styled.div`
 height:100%;
 width:100%;
 display:flex;
 flex-direction:column;
 position:relative;
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

const Container1 = styled.div`
display:flex;
justify-content:center;
position:relative;
width:100%;

// background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
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

const CreateContainer = (props) =>{
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [spotToken, setSpotToken] = useState(localStorage.getItem('spotifyAuthToken'));
     
    const [name, setName] = useState('');    

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


    // useEffect(() => {
    //     setSpotToken(localStorage.getItem('spotifyAuthToken'));
       
    // }, [])
    
return (
<>
<Container1>
    <Container2>
        <Nav user={props.user} createMode={true} logOutHandler={props.logOutHandler} createPath={createPath} />
    </Container2>
    <Container3>
        <CreateMap history={props.history} user={props.user} logOutHandler={props.ogOutHandler}/>
        <UserSpotPlaylists spotToken={spotToken}/>
    </Container3>


</Container1>
</>
)
}

export default CreateContainer 