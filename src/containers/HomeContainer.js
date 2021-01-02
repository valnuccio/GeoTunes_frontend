import React, { useState, useEffect } from 'react';

import ViewMap from './maps/ViewMap'
import 'react-spotify-auth/dist/index.css'
import {  Header, Icon} from 'semantic-ui-react'
import '../../src/customCss/homeCss.css'
import SpotifyAuthScreen from './SpotifyAuthenticationScreen';
import "@reach/combobox/styles.css";

const HomeContainer = (props) =>{
   
    const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

    useEffect(() => {
      setToken(localStorage.getItem('spotifyAuthToken'))
    }, [token])
  

    return(

       
        <div>
            
           {token?
            <div>
                <Header id='logoHeader' as='h2' icon>
                            <Icon name='globe' />
                            {props.user.user.name}'s Homepage
                            
                </Header>

                <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>
            </div>
       :
       <SpotifyAuthScreen/>}
            
        </div>
        
    )
};

export default HomeContainer;