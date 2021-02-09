import React, {useState, useCallback, useRef, useEffect} from 'react';

import { UserPlaylists } from 'react-spotify-api'
import { SpotifyApiContext } from 'react-spotify-api';
import { Dropdown, Header, Input  } from 'semantic-ui-react'






import "@reach/combobox/styles.css";



const UserSpotPlaylists = (props) =>{
  



    return(
        <>
        <SpotifyApiContext.Provider value={props.spotToken}> 
                    <UserPlaylists >
                            {
                            (playlists, loading, error) => {
                                let plOptions;
                                if (playlists.data) {
                                    //console.log('plData', playlists.data.items);

                                        plOptions = playlists.data.items.map((pl, i) => {
                                        return {key: i, value: pl.uri, text: pl.name}
                                    });
                                }
                                
                                if(plOptions) {
                                    return(
                                        <>
                                        <Header id='headerPL' as='h2' icon='music' content='Add Playlist and Name Route' />
                                        <Dropdown options= {plOptions}
                                            placeholder='Select Playlist'
                                            fluid
                                            search
                                            selection
                                            onChange = {(e, data) => props.setSelectedPlaylist(data.value)}
                                        />
                                        <Input
                                            onChange = {(e) => props.setName(e.target.value)}
                                            value={props.name}
                                            label={{ icon: 'headphones' }}
                                            labelPosition='right corner'
                                            placeholder='Name your Play Route...'
                                            style={{width: '100%'}}
                                        />
                                        </>
                                    ) 
                                } else {
                                    return <h1>loading</h1>
                                }
                            }
                                
                            }
                        
                    </UserPlaylists>
                            
                </SpotifyApiContext.Provider> 
                
        </>
    )
}


export default UserSpotPlaylists