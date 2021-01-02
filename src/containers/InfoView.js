import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import { SpotifyApiContext, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';
import { List, Segment, Button } from 'semantic-ui-react';
import ShowMap from "./maps/ShowMap";
import "@reach/combobox/styles.css";
import '../customCss/map.css';
import SpotifyAuthButton from '../components/mainPageComponents/SpotifyAuthButton';




const InfoView = (props) => {

    

    const [spotToken, setSpotToken] = useState(localStorage.getItem('spotifyAuthToken'));
    
    useEffect(() => {
        setSpotToken(localStorage.getItem('spotifyAuthToken'));
    }, [])


    return(
        <div>
            <ShowMap routeId={props.routeID} infoView={true} getData={()=> null} getCords={() => null} showMarkers={props.showMarkers}/>
        <div id ='plContainer'>
                <NavLink to={`/routes/${props.routeID}`} > 
                    <Button
                    style={{width: '100%'}}
                     primary>
                        Listen to Route
                    </Button>
                </NavLink>
            <SpotifyApiContext.Provider value={spotToken}> 
            <PlaylistTracks id={props.playlist.split(':')[2]}>
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
                            return (
                                <SpotifyAuthButton header={'Connect Spotify to View Playlists'} redirectUri={`http://localhost:3001/home`}/>
                                )
                        }
                    }
                }
                   
                    
                        </PlaylistTracks>
            </SpotifyApiContext.Provider> 
            </div>
            </div>
    )

}

export default InfoView