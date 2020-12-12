import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';


const SpotifyAuthScreen=()=>{



    
    return (
           
                    <SpotifyAuth
                        title={'Register Spotify'}
                        redirectUri={'http://localhost:3001/'}
                        clientID={'7699a750048847108551359ed7981d8d'}
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

export default SpotifyAuthScreen