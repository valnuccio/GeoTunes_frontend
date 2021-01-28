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



const HomeContainer = (props) =>{


   const[selected, setSelected] = useState(null)

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
    document.body.style.height="1400px"
    } 

   
    , [token])

    


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
        setSelected(null)
    }


    console.log()
    return(

     <>
       
         <Container1> 
                
                {token?
                
                 
                        <>
                        <Container2>
                            <ImageContainer>
                                <Image src={mainLogo}></Image>
                            </ImageContainer>
                            {updatedProfile? <Nav token={token} selected={selected} page={'home'} createMode={false} previewRoute={previewRoute}  user={updatedProfile}/>:null}
                            {selected? <SpotifyList token={token} selected={selected}/>:null}
                         </Container2> 

                         
                          
                            <Container3>
                                <HorizontalNav user={props.user} logOutHandler={props.logOutHandler}/>
                                
                                    {playListName?<ShowMap home={true} showMarkers={markers} getData={()=>null} getCords={() => null} resetMap={resetMap}/>:<ViewMap setSelected={setSelectedMini} selected={selected} setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>}
                                
                            </Container3>
                            
                            </>
              
                   
                
            

         :


                    <SpotifyAuthScreen/>



            }
            
           
            </Container1>
            
            <Footer/>
        </>
    )
};

export default HomeContainer;