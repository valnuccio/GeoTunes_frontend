import React, { useState, useEffect } from 'react';


import 'react-spotify-auth/dist/index.css';

import "@reach/combobox/styles.css";
import styled from 'styled-components';



import { List, Segment,} from 'semantic-ui-react';
import { SpotifyApiContext, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';



const Container=styled.div`
overflow:scroll;
max-height:60vh;
`






const SpotifyList = (props) => {

    console.log('beep', props.selected.playlist)
return (
   
    <Container>
    <SpotifyApiContext.Provider value={props.token}> 
                            <PlaylistTracks id={props.selected.playlist.split(':')[2]}>
                            {

                    (tracks) => {
                        if (tracks.data) {

                            
                           let mappedTracks = tracks.data.items.map(track => (
                               <List.Content key={track.track.id}>
                                    <List.Header key={track.track.id}>
                                        {track.track.name}
                                    </List.Header>
                        
                                    <Artist id={track.track.artists[0].id}>
                                        {
                                            artist => {
                                                return artist.data ?   ` by ${artist.data.name}` : null
                                            }
                                        }

                                    </Artist>
                                </List.Content>
                            ))



                            return (
                                <Segment inverted>
                                    
                                    <Playlist id={props.selected.playlist.split(':')[2]}>
                                        {
                                            playlist => {
                                             return playlist.data ? <h4>Playlist Name: {playlist.data.name}</h4> : null
                                            }
                                        }
                                    </Playlist>

                                    Songs:
                                    <List divided inverted relaxed>
                                        <List.Item>
                                                {mappedTracks}
                                        </List.Item>
                                    </List>
                                </Segment>
                            )
                    
                        } else {
                            return (
                                <h3>Loading...</h3>
                                )
                        }
                    }
                }



                             </PlaylistTracks>
                        </SpotifyApiContext.Provider>      
                            
                        </Container>
    
)

}

export default SpotifyList