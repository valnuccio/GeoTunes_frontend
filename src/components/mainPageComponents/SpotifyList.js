
import React, { useState, useEffect } from 'react';


import 'react-spotify-auth/dist/index.css';

import "@reach/combobox/styles.css";
import styled from 'styled-components';



import { List, Segment,} from 'semantic-ui-react';
import { SpotifyApiContext, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';




const StyledSegment = styled(Segment)`
position:fixed;
bottom:0px;
z-index:1
`





const SpotifyList = (props) => {
return (
    <>
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
                                <StyledSegment inverted>
                                    
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
                                </StyledSegment>
                            )
                    
                        } else {
                            return (
                                <h3>dead space</h3>
                                )
                        }
                    }
                }



                             </PlaylistTracks>
                        </SpotifyApiContext.Provider>      
                            

    </>
)

}

export default SpotifyList