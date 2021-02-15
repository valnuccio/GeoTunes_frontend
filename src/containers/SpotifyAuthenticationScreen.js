import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import styled from 'styled-components';

const SpotInfoContainer = styled.div`

`



const SpotifyAuthScreen=()=>{

    

  
    
    return (
        <>
        
        <SpotInfoContainer>
            
                
                <h3>This application relies heavily on the use of a Spotify Premium Acct </h3>
                <h3> Please click below to login to your Spotify Acct</h3>
                <br></br><br></br><br></br>
                <SpotifyAuth
                        title={'Click Here to Register Spotify'}
                        redirectUri={'https://geotunes-frontend.herokuapp.com/home'}
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
                        onAccessToken={(token)=> console.log(token)}
                        
                        
                     />
                
            
            
           
                   
     
     </SpotInfoContainer>
     
     </>
    )
}





export default SpotifyAuthScreen