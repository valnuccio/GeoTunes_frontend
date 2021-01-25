import React, {useEffect} from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import styled from 'styled-components';

const SpotInfoContainer = styled.div`

`
const Design = styled.div`
width:70%;
position:relative;

left:5vw;
background: rgb(169,169,169);
background: linear-gradient(350deg, rgba(169,169,169,1) 0%, rgba(52,52,52,0.8393732492997199) 92%);
z-index:1;
border-radius: 12% / 50%;
padding:5% 5%;
box-shadow: 0 40px 40px rgba(0,0,0,1)
display:flex;
align-items:center;
`

const Box= styled.div`
width:70%;
position:relative;
height:70vh;
left:5vw;
background: rgb(169,169,169);
background: linear-gradient(350deg, rgba(169,169,169,1) 0%, rgba(52,52,52,0.8393732492997199) 92%);
z-index:1;
border-radius: 30% / 50%;
padding:10%;
box-shadow: 0 40px 40px rgba(0,0,0,1)
display:flex;
align-items:center;
justify-content:center;
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
                        onAccessToken={(token)=> console.log(token)}
                        
                        
                     />
                
            
            
           
                   
     
     </SpotInfoContainer>
     
     </>
    )
}





export default SpotifyAuthScreen