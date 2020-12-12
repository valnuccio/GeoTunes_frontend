import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';


const SpotifyAuthButton = (props) => {
    

    return(
   
        <SpotifyAuth
                        title={props.header}
                        redirectUri={props.redirectUri}
                        clientID='7699a750048847108551359ed7981d8d'
                        scopes={[
                            'streaming', 
                            'user-read-email',
                            'user-read-private',
                            'user-read-playback-state',
                            'user-modify-playback-state',
                            'user-library-read',
                            'user-library-modify'

                        ]} 
                        localStorage = {true}

                        noCookie = {true}
        />
      
    )
}

export default SpotifyAuthButton