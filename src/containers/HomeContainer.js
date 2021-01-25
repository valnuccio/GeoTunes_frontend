import React, { useState, useEffect } from 'react';

import ViewMap from './maps/ViewMap';
import 'react-spotify-auth/dist/index.css';
import mainLogo from '../../src/images/mainLogo.png';
import SpotifyList from '../components/mainPageComponents/SpotifyList'
import SpotifyAuthScreen from './SpotifyAuthenticationScreen';
import "@reach/combobox/styles.css";
import styled from 'styled-components';
import Nav from '../components/mainPageComponents/Nav';
import ShowMap from '../containers/maps/ShowMap'

import { getUser, playroutes } from '../railsserver';
import { List, Segment, Button } from 'semantic-ui-react';
import { SpotifyApiContext, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';




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



const ButtonContainer=styled.div`
width:20vw;
margin-left:7vw;

`

const Page = styled.div`
height:auto;
`


const HomeContainer = (props) =>{


   const[selected, setSelected] = useState(null)

    const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

    const HorizontalNav = styled.div`
    display:flex;
    height:auto;
    justify-content:flex-end;
    margin-top:30px;
    `

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
    const[playlist, setPlaylist] = useState(false)
const [playListName , setPL] = useState(false)
const [playlistID, setPlaylistID] = useState(null)


const previewRoute = (id) => {
    
    setPlaylistID(id)
    fetch(`${playroutes}/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(r => r.json())
    .then(route => {
        
            setMarkers(route.pins);
            setPlaylist(route.playlist);
            setPL(route.name)
        })
}


//   for Show Map

    const setSelectedMini = (marker)=>{
        console.log('tap')
        setSelected(marker)

    }

    const resetMap = () =>{
        setMarkers([]);
        setPL(false);
        setPlaylistID(null);
        setPlaylist(false);
    }

    return(

     <>
       
                   
                
                {token?
                  <Page>
                 <Container1>
                        
                        <Container2>
                            <ImageContainer>
                                <Image src={mainLogo}></Image>
                            </ImageContainer>
                            {updatedProfile? <Nav page={'home'} createMode={false} previewRoute={previewRoute} logOutHandler={props.logOutHandler} user={updatedProfile}/>:null}
                         </Container2>  
                            <Container3>
                                <HorizontalNav>
                                {props.user? <h3>Welcome {props.user.user.name}</h3>:null}
                                    <ButtonContainer>
                                        <Button onClick = {props.logOutHandler}> Sign out</Button>
                                     </ButtonContainer> 
                                    
                                    

                                    </HorizontalNav>
                                    {playListName?<ShowMap home={true} showMarkers={markers} getData={()=>null} getCords={() => null} resetMap={resetMap}/>:<ViewMap setSelected={setSelectedMini} selected={selected} setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>}
                                
                            </Container3>
                            
               </Container1>
                    {/* {selected? <SpotifyList selected={selected} token={token}/>:null} */}
                </Page>
            

         :
            <SpotifyAuthScreen/>}
            
           
        </>
    )
};

export default HomeContainer;