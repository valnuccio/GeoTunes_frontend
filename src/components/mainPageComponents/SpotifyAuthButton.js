import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';

const SpotifyAuthButton = (props) => {
    const cbs ='http://localhost:3001/home'

    return(
        <SpotifyAuth
                        title={props.header}
                        redirectUri={props.redirectUri}
                        clientID='4fc7bf448443478b8181ef1cc8d069ad'
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