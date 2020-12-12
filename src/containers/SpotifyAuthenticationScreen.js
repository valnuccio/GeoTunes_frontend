import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import '/Users/valerie/Development/code/projects/mod4-project/frontend/src/customCss/spotButtonScreen.css'


const SpotifyAuthScreen=()=>{



    
    return (
        <div id="container" style={styles.container}>
            <div id="text">
                <h2>This application relies heavily on the use of a Spotify Acct </h2>
                <h2> Please click below to login to your Spotify Acct</h2>
            </div>
            <br></br><br></br><br></br>
           
                    <SpotifyAuth
                        title={'Click Here to Register Spotify'}
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
     
     </div>
    )
}


const styles={
    container:{
        "align-items":"center",
        "justify-content":"center"
}
}


export default SpotifyAuthScreen