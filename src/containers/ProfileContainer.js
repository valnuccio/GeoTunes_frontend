import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import ShowMap from './maps/ShowMap';
import Nav from '../components/mainPageComponents/Nav';
import {Playlist, PlaylistTracks, Artist } from 'react-spotify-api';
import { SpotifyApiContext } from 'react-spotify-api';

import '../customCss/profile.css'
import { getUser, playroutes } from '../railsserver';
import { 
    Segment, 
    List ,
    Header,
    Icon,
    Button

} from 'semantic-ui-react'




const ProfileContainer = (props) => {
    
    const [updatedProfile, setUpdatedProfile] = useState(null);
    const [markers, setMarkers] = useState([]);
    const[playlist, setPlaylist] = useState('')
    useEffect(() => {
        fetch(getUser, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(foundProfile => { 
            console.log(foundProfile)
            setUpdatedProfile(foundProfile) 
        })     
    }, [])

    const [playListName , setPL] = useState('')

    const previewRoute = (id) => {
    
        setPlaylistID(id)
        fetch(`${playroutes}/${id}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(r => r.json())
        .then(route => {
            console.log(route)
                setMarkers(route.pins);
                setPlaylist(route.playlist);
                setPL(route.name)
            })
    }
    const [playlistID, setPlaylistID] = useState(null)
    return(
        <>
        <div id='headerNav'>
            <Header id='logoHeader' as='h2' icon>
                        <Icon name='globe' />
                        {props.user.user.name}'s Profile 
                       
                    
            </Header>
            <Nav user={props.user} logOutHandler={props.logOutHandler} />
            </div>
            {
             
                updatedProfile ? 
                (
                <> 
                    
                     <Segment inverted>
                        <Header as='h2' icon='map pin' content='My Routes:' />
                    </Segment>
                    {updatedProfile.user.play_routes.length >0? (
                    <List>
                    <div class="ui raised segments">
                    {

                        updatedProfile.user.play_routes.map( (r, i) => {
                            return(
                                <div class="ui segment">
                                <List.Item id={`${r.id}`} onClick={(e) => previewRoute(e.target.id)} key={r.id} >
                                    <Icon id={`${r.id}`} name='headphones' />
                                    <List.Content>
                                        <List.Header id={`${r.id}`}>{r.name}</List.Header>
                                      
                                     </List.Content>
                                </List.Item>
                                </div>
                            ) 
                        })
                    }
                    </div>
                    </List>)
                    :
                    <p>Looks like you don't have any routes created yet! Check out "Create Path" on the Nav Bar to make some</p>}

                    <Segment inverted>
                        <Header as='h2' icon='heartbeat' content='Favorite Routes' />
                    </Segment>
                    {updatedProfile.user.routes.length>0? (                    <List>
                    <div class="ui raised segments">
                    {
                            
                        updatedProfile.user.routes.map( (r, i) => {
                            return(
                                <div class="ui segment">
                                <List.Item id={`${r.id}`} onClick={(e) => previewRoute(e.target.id)} key={r.id} >
                                    <Icon id={`${r.id}`} name='headphones' />
                                    <List.Content>
                                        <List.Header id={`${r.id}`}>{r.name}</List.Header>
                                    
                                     </List.Content>
                                </List.Item>
                                </div>
                            
                            ) 
                        })
                    }
                    </div>
                    </List>):
                    <p> Looks like you don't have any routes Favorited yet!</p>}
         
                    {playListName!=""?(
                    <>
                            <Header id='itunesHeader' as='h4' icon>
                                <Icon name='itunes' />
                                Selected Play Route:
                                <Header.Subheader id='logoSubHeader'>
                                    {playListName}
                                </Header.Subheader>
                            </Header>
                    </>):null}

                    {updatedProfile.user.routes.length>0 &&  updatedProfile.user.play_routes.length>0? (
                        <h2>Select a Route to Begin </h2>):null
                    }

                    {!updatedProfile.user.routes.length>0 &&  !updatedProfile.user.play_routes.length>0? (
                        <h2>Use the map below by adding routes to your profile</h2>):null
                    }


                    <ShowMap showMarkers={markers} getData={()=>null} getCords={() => null} />
                    
                    <SpotifyApiContext.Provider value={localStorage.getItem('spotifyAuthToken')}> 
                    <PlaylistTracks id={playlist.split(':')[2]}>
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
                                                return artist.data ? ` by ${artist.data.name}` : null
                                            }
                                        }

                                    </Artist>
                                </List.Content>
                            ))



                            return (
                                <>
                                <NavLink to={`/routes/${playlistID}`} > 
                                    <Button 
                                    style={{width: '100%'}}
                                    primary>
                                        Listen to Route
                                    </Button>
                                </NavLink>

                                <Segment inverted>
                                    
                                    <Playlist id={playlist.split(':')[2]}>
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
                            </>
                            )
                    
                        } else {
                            
                            return null
                        }
                    }
                }
                   
                    
                        </PlaylistTracks>
                        </SpotifyApiContext.Provider>
                    
                    
                </>
                )
                :
                (
                    <h1>Loading</h1>
                )
                
            }
        </>
    )
}

export default ProfileContainer;