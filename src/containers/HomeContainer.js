import React, { useState, useEffect } from 'react';

import ViewMap from './maps/ViewMap';
import 'react-spotify-auth/dist/index.css';

import Header from '../components/mainPageComponents/Header';
import SpotifyAuthScreen from './SpotifyAuthenticationScreen';
import "@reach/combobox/styles.css";
import styled from 'styled-components';
import Nav from '../components/mainPageComponents/Nav';




const Container1 = styled.div`
width:100vw;
height:100vh;
background-image: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
`

const Container2 = styled.div`
display:flex;

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
                        <Header page={"home"}/>
                        <Container2>
                            <Nav page={'home'} createMode={false} logOutHandler={props.logOutHandler} user={props.user}/>
                            
                                <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>
                            
                        </Container2>
               </Container1>

         :
            <SpotifyAuthScreen/>}
            
           
        </>
    )
};

export default HomeContainer;