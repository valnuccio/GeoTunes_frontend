import React, {useState, useCallback, useRef, useEffect} from 'react';
import mapStyle from '../../customCss/mapStyle'


import {
    GoogleMap,
    useLoadScript,
    Marker,
    I

} from '@react-google-maps/api';


import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import MapsDirectionsRenderer from './MapsDirectionsRenderer'
import { playroutes as playRoutes } from '../../railsserver'


import{
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import styled from 'styled-components';
import Search from '../../components/MapComponents/Search';
import Locate from '../../components/MapComponents/Locate';


const MapDiv = styled.div`
position:relative;
width: 70vw;


`

const libraries = ['places'];

const mapContainerStyle = {
    // width: '90vw',
    height: '120vh',
    borderRadius:'3%'
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

const CreateMap = (props) =>{

document.addEventListener("keydown", (e) => removePin(e), false);


 const [selected, setSelected] = useState(null);


    const removePin = ({ code }) => {
        

        if (code === 'Escape') {
            props.setMarkers(current => current.slice(0, -1))
        }
          
        
    
    } 
    
    const onMapClick = useCallback((event) => {
        let counter = 0
        if (counter < 5) {
            props.setMarkers((current)=>[
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

    const panTo = useCallback(({lat, lng})=> {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    },[]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries
    });

    const mapRef = useRef();

    const onMapLoad= useCallback((map)=>{
        mapRef.current=map; 
    },[])

    if (loadError) return 'Error Loading Maps';
    if (!isLoaded) return 'Loading Maps';



    return (
        <>
                  <MapDiv>
                <Search panTo={panTo}/>
                <Locate panTo={panTo} options={options} />
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={12}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                       
                >
                    {props.markers.map((marker, i) => (
                        
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
                        draggable: true,
                    }}
                    // onClick={()=>{
                    //     props.setSelected(marker);
                    //     }}

                        onDragEnd={(e) => {
                       
                            marker.lat = e.latLng.lat();
                            marker.lng = e.latLng.lng();
                            let updatedMarkers = [...props.markers];
                            updatedMarkers[marker.id] = marker
                            props.setMarkers(updatedMarkers);
                            
                        }}
                      />
                    ))}
                   
                   {props.markers.length>1? <MapsDirectionsRenderer getData ={props.getData} getCords={() => null} places={props.markers}/> : null} 
                   
    
                    
                </GoogleMap>
                </MapDiv>
                
        </>

    )
                }


                export default CreateMap