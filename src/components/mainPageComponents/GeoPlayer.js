import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { User, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';
import { SpotifyApiContext } from 'react-spotify-api';
import { List, Segment } from 'semantic-ui-react';


const GeoPlayer = (props) => {

    const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

    useEffect(() => setToken(localStorage.getItem('spotifyAuthToken'))
    ,[])

    const [currentPL, setCurrentPL] = useState(props.playlist);

    useEffect(() => setCurrentPL(props.playlist)
    ,[props.playlist])

    return (
            
        token ? 
        (
            <>

                        <SpotifyPlayer
                            uris={[currentPL]}
                            name ='geoPlayer'
                            token={token}
                            styles={{
                                bgColor: '#2FA0B1',
                                color: '#fff',
                                loaderColor: '#fff',
                                sliderColor: '#1cb954',
                                savedColor: '#fff',
                                trackArtistColor: '#ccc',
                                trackNameColor: '#fff',
                            }}
        
                        />



                <User>
                    {(user, loading, error) =>
                        user.data ? (
                            <ul>
                                <li>Name - {user.data.display_name}</li>
                                <li>ID - {user.data.id}</li>
                            </ul>
                        ) : null
                    }
                </User>
                <SpotifyApiContext.Provider value={token}> 
                <PlaylistTracks id={props.playlist.split(':')[2]}>
                {
                    (tracks) => {
                        if (tracks.data) {
                           let mappedTracks = tracks.data.items.map((track, i) => (
                               <List.Content key ={i}>
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
                                    
                                    <Playlist id={props.playlist.split(':')[2]}>
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
                            return <h2>Loading</h2>
                        }
                    }
                }
                   
                    
                        </PlaylistTracks>
                        </SpotifyApiContext.Provider>
                        
                        
                        
                    </>
            )
            :
            (
                null
            )
            
            
       
    )
    
}

export default GeoPlayer