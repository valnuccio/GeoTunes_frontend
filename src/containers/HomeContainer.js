import React, { useState, useEffect } from 'react';

import ViewMap from './maps/ViewMap';
import 'react-spotify-auth/dist/index.css';
import {  Header, Icon} from 'semantic-ui-react';
import LoginHeader from '../components/LoginComponents/LoginHeader';
import SpotifyAuthScreen from './SpotifyAuthenticationScreen';
import "@reach/combobox/styles.css";
import styled from 'styled-components';
import Nav from '../components/mainPageComponents/Nav'

const Container1 = styled.div`
width:100%;
height:100%;
background: rgb(169,169,169);
background: linear-gradient(350deg, rgba(169,169,169,1) 0%, rgba(52,52,52,0.8393732492997199) 92%);

`




const HomeContainer = (props) =>{
   
    const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

    useEffect(() => {
      setToken(localStorage.getItem('spotifyAuthToken'))
    }, [token])
  

    return(

       <>
       
                   
                
                {token?
                  
                  <Container1>
                        <LoginHeader/>
                        <Nav createMode={false} logOutHandler={props.logOutHandler} user={props.user}/>
                        <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>
                 </Container1>

         :
            <SpotifyAuthScreen/>}
            
           
        </>
    )
};

export default HomeContainer;