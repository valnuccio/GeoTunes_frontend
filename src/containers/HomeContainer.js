import React, { useState, useEffect } from 'react';

import ViewMap from './maps/ViewMap';
import 'react-spotify-auth/dist/index.css';
import mainLogo from '../../src/images/mainLogo.png';

import SpotifyAuthScreen from './SpotifyAuthenticationScreen';
import "@reach/combobox/styles.css";
import styled from 'styled-components';
import Nav from '../components/mainPageComponents/Nav';


const Image = styled.img`
z-index:1;
height:33vh;
width:80%;
border-bottom-right-radius:3%;
border-top-right-radius:2%;
`

const Container1 = styled.div`
display:flex;
position:relative;
height:100%;
// background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
`

const Container2 = styled.div`
display:flex;
flex-direction:column;

`

// const Container3 = styled.div`
// borderRadius:40%;
// `
const HomeContainer = (props) =>{
   
    const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

    useEffect(() => {
      setToken(localStorage.getItem('spotifyAuthToken'))
    }, [token])
  

    return(

       <>
       
                   
                
                {token?
                  
                 <Container1>
                        
                        <Container2>
                            <Image src={mainLogo}></Image>
                            <Nav page={'home'} createMode={false} logOutHandler={props.logOutHandler} user={props.user}/>
                         </Container2>  

                                <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>
                            
                        
               </Container1>

         :
            <SpotifyAuthScreen/>}
            
           
        </>
    )
};

export default HomeContainer;