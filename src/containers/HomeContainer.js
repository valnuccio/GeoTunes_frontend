import React, { useState, useEffect } from 'react';

import ViewMap from './maps/ViewMap';
import 'react-spotify-auth/dist/index.css';
import mainLogo from '../../src/images/mainLogo.png';

import SpotifyAuthScreen from './SpotifyAuthenticationScreen';
import "@reach/combobox/styles.css";
import styled from 'styled-components';
import Nav from '../components/mainPageComponents/Nav';


import { getUser, playroutes } from '../railsserver';






// Styled Components
const Image = styled.img`
z-index:1;
width:20vw;


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
position:relative;
height:100%;
width:100%;
// background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
`

const Container2 = styled.div`
display:flex;
flex-direction:column;

`

const Container3 = styled.div`
`

// const Container3 = styled.div`
// borderRadius:40%;
// `
const HomeContainer = (props) =>{

    // const [user, setUser]=useState(false)
   
    const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

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
      
    }, [token])


// imported from ProfileContainer
const [updatedProfile, setUpdatedProfile] = useState(null);
    const [markers, setMarkers] = useState([]);
    const[playlist, setPlaylist] = useState('')
const [playListName , setPL] = useState('')
const [playlistID, setPlaylistID] = useState(null)


const previewRoute = (id) => {
    
    setPlaylistID(id)
    fetch(`${playroutes}/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(r => r.json())
    .then(route => {
        console.log(route)
            setMarkers(route.pins);
            setPlaylist(route.playlist);
            setPL(route.name)
        })
}


  console.log(props.user.user.name)

    return(

       <>
       
                   
                
                {token?
                  
                 <Container1>
                        
                        <Container2>
                            <ImageContainer>
                                <Image src={mainLogo}></Image>
                            </ImageContainer>
                            {updatedProfile? <Nav page={'home'} createMode={false} previewRoute={previewRoute} logOutHandler={props.logOutHandler} user={updatedProfile}/>:null}
                         </Container2>  
                            <Container3>
                                {props.user? <h3>Welcome {props.user.user.name}</h3>:null}
                                <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>
                            </Container3>
                        
               </Container1>

         :
            <SpotifyAuthScreen/>}
            
           
        </>
    )
};

export default HomeContainer;