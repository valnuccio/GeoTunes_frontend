import React, {useState, useCallback, useRef, useEffect} from 'react';
import mapStyle from './../../customCss/mapStyle';
import Nav from '../../components/mainPageComponents/Nav';
import { UserPlaylists } from 'react-spotify-api'
import { SpotifyApiContext } from 'react-spotify-api';
import { Dropdown, Header, Icon, Input  } from 'semantic-ui-react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,

} from '@react-google-maps/api';
import { formatRelative } from "date-fns";

import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import MapsDirectionsRenderer from './MapsDirectionsRenderer';
import { playroutes as playRoutes } from '../../railsserver'


import{
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import '../../customCss/map.css';



const libraries = ['places'];

const mapContainerStyle = {
    width: '90vw',
    height: '80vh',
};

const center = {
    lat: 40.7128,
    lng: -74.0060,
};

const options  = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,

};


const CreateMap = (props) => {

    
    useEffect(() => {
        setSpotToken(localStorage.getItem('spotifyAuthToken'));
        document.addEventListener("keydown", (e) => removePin(e), false);
    }, [])

    
    
    
    const [name, setName] = useState('');

    const createPath = () => {
            let playRouteData = {
                playRouteData: markers,
                user: props.user.user,
                playlist: selectedPlaylist,
                plName: name
            }
            
        fetch(playRoutes, {
            method: 'POST',
            headers: {
                
                Accepts: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(playRouteData)
        })
        .then()
        .then( () => {
            alert('Route Created')
            props.history.push('/home')
            //window.location.reload()
        })
    
    }

    const removePin = ({ code }) => {
        
        if (code === 'Escape') {
            setMarkers(current => current.slice(0, -1))
        }
          
        
    
    }

    const onMapClick = useCallback((event) => {
        let counter = 0
        if (counter < 5) {
            setMarkers((current)=>[
                ...current,
                {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date(),
            },
        ])
        counter += 1
    
        } else {
            alert('Max 5 Markers')
    };

    
    },[]) ; 

    const mapRef = useRef();

    const onMapLoad= useCallback((map)=>{
        mapRef.current=map; 
    },[])

    const panTo = useCallback(({lat, lng})=> {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    },[]);

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [spotToken, setSpotToken] = useState(localStorage.getItem('spotifyAuthToken'));

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries
    });


    if (loadError) return 'Error Loading Maps';
    if (!isLoaded) return 'Loading Maps';
   
    return (
        <div>
            <Header id='logoHeader' as='h2' icon>
                        <Icon name='globe' />
                        {props.user.user.name}'s Profile 
                        <Header.Subheader id='logoSubHeader'>
                            click and drag Pins, Add a playlist, and name your route
                        </Header.Subheader>
            </Header>
            
             <Nav user={props.user} createMode={true} logOutHandler={props.logOutHandler} createPath={createPath} />
            
            <div id='createMap'>
                
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
                   
            >
                {markers.map((marker, i) => (
                    
                <Marker 
                draggable={true}
                id={i}
                key={i} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                    url:'/Sound-Wave-Headphones.svg', 
                    scaledSize: new window.google.maps.Size(30,30), 
                    origin: new window.google.maps.Point(0,0), 
                    anchor: new window.google.maps.Point(15,15),
                    //draggable: true,
                }}
                onClick={()=>{
                    setSelected(marker);
                    }}
                    onDragEnd={(e) => {
                        // console.log(marker.lat);
                        // console.log(e.latLng.lat());
                        // console.log(e.latLng.lng());
                        marker.lat = e.latLng.lat();
                        marker.lng = e.latLng.lng();
                        let updatedMarkers = [...markers];
                        updatedMarkers[marker.id] = marker
                        setMarkers(updatedMarkers);
                        
                    }}
                  />
                ))}
                {/* {markers.length>1 ? console.log("this is markers:", markers): null } */}
               {markers.length>1? <MapsDirectionsRenderer getData ={() => null} getCords={() => null} places={markers}/> : null} 
               

                {selected ? 
                (<InfoWindow position={{lat: selected.lat, lng: selected.lng }} onCloseClick={()=>{
                    setSelected(null);  
                }}>
                    <div>
                        <h2>
                            Playlist created at:
                        </h2>
                            <p> {formatRelative(selected.time, new Date())}</p>
                            <h2> cords:</h2>
                            <p>lat: {selected.lat}, lng:{selected.lng} </p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
            </div>
            <Search  panTo={panTo} />
            <Locate panTo={panTo}/> 
            {/* {console.log(markers)} */}
            <div id ='plContainer'>
            <SpotifyApiContext.Provider value={spotToken}> 
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
                                            onChange = {(e, data) => setSelectedPlaylist(data.value)}
                                        />
                                        <Input
                                            onChange = {(e) => setName(e.target.value)}
                                            value={name}
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
            </div>
        </div>
    );
}


const Locate= ({panTo}) =>{
    return (
    <button className="locate" onClick={()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        }, () => null, options);
    }}>
        <img src="compass.svg" alt="compass - locate me"/>
    </button>
    );
} 

const Search = ({panTo}) =>{
    const {
        ready,
        value, 
        suggestions:{status, data}, 
        setValue, 
        clearSuggestions,
    } = usePlacesAutoComplete({
        requestOptions:{
            location: { lat: () => 40.7128 , lng: () => -74.0060},
            
            radius: 200 * 1000,
// check vid at about 28 min
        }
    });

    return (
        <div className="search">
        <Combobox onSelect={async(address) => {
            setValue(address, false);
            clearSuggestions()
            try {
            const results = await getGeocode({address});
            const { lat, lng } = await getLatLng(results[0]);
            panTo({lat, lng})
            } catch(err ) {
                console.log("error!")
            }
        }}
        >
            <ComboboxInput value={value} onChange={(e) => {
                setValue(e.target.value)
            }}
            
            disabled={!ready}
            placeholder = "Enter an address"
            />
            <ComboboxPopover>
                <ComboboxList> 
                {status === "OK" && data.map(({id,description})=>(
                    <ComboboxOption key={id} value={description}/>
                ))}
                 </ComboboxList>
            </ComboboxPopover>
        </Combobox> 

        </div>
        
        
    )



}
export default CreateMap