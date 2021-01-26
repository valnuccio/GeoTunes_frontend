
import React, {useState, useCallback, useRef, useEffect} from 'react';

import mapStyle from './../../customCss/mapStyle';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,

} from '@react-google-maps/api';
import { playroutes as playRoutes } from '../../railsserver';

import InfoView from "../InfoView";
import Search from '../../components/MapComponents/Search';
import Locate from '../../components/MapComponents/Locate';

import "@reach/combobox/styles.css";
import styled from 'styled-components';



// test

const StyledInfoWindow = styled(InfoWindow)`
height:100%;
width:100%;

`
const MapDiv = styled.div`
position:relative;
width: 70vw;


`

const libraries = ['places'];

const mapContainerStyle = {
    // width: '90vw',
    height: '120vh',
    borderRadius: '3%',
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



const ViewMap = (props) => {

    const prepPinRender = (prd) => {
        
        return prd.map((pr, i) => {
            
            return {
                lat: pr.pins[0].lat, 
                lng: pr.pins[0].lng, 
                id: pr.id,
                subPins: pr.pins,
                playlist: pr.playlist
            }
        })
    }

    useEffect(() => {
        //Authorization: `Bearer ${localStorage.getItem('token')}`
        fetch(playRoutes, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        .then(r => r.json() )
        .then(playRoutes2 => {
            let allPins = prepPinRender(playRoutes2);

            setMarkers((current)=>[
                ...current,
                ...allPins
            ])
        })
    
    }
    ,[])



const mapRef = useRef();

const onMapLoad= useCallback((map)=>{
    mapRef.current=map; 
},[])

const panTo = useCallback(({lat, lng})=> {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(14);
},[]);

const [markers, setMarkers] = useState([])
const [selected, setSelected] = useState(null)

const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries
});


if (loadError) return 'Error Loading Maps';
if (!isLoaded) return 'Loading Maps';



    return (
       
       
            
            <MapDiv>
                    <Search  panTo={panTo} />
                    <Locate panTo={panTo} options={options} /> 
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={12}
                        options={options}
                        onLoad={onMapLoad}
                        
                    >
                        {markers.map(marker => (
                            
                        <Marker 
                        key={marker.id} 
                        position={{lat: marker.lat, lng: marker.lng}} 
                        icon={{
                            url:'/Sound-Wave-Headphones.svg', 
                            scaledSize: new window.google.maps.Size(30,30), 
                            origin: new window.google.maps.Point(0,0), 
                            anchor: new window.google.maps.Point(15,15),
                        }}
                        onClick={()=>{
                            props.setSelected(marker);
                            
                            }}
                        />
                        ))}

                        {props.selected ? 
                        
                        
                        (
                            
                        <StyledInfoWindow 
                            
                            position={{lat: props.selected.lat, lng: props.selected.lng }} 
                            onCloseClick={()=>{ 
                            setSelected(null);  
                            }}>
                            <div>
                               
                                <InfoView routeID={props.selected.id} setPlayRoute={props.setPlayRoute} playlist={props.selected.playlist} showMarkers={props.selected.subPins} />
                            </div>
                        </StyledInfoWindow>) : null}
                    </GoogleMap>
            </MapDiv>
       
         
    );
}




export default ViewMap