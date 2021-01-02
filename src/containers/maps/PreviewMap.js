



import React, {useState, useCallback, useRef, useEffect} from 'react';

import mapStyle from './../../customCss/mapStyle';
import {
    GoogleMap,
    useLoadScript,
    Marker
} from '@react-google-maps/api';
import { playroutes as playRoutes } from '../../railsserver';
import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import{
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";




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



const PreviewMap = (props) => {

    const prepPinRender = (prd) => {
        console.log('prd', prd)
        return prd.map((pr, i) => {
            return {
                lat: pr.pins[0].lat, 
                lng: pr.pins[0].lng, 
                id: pr.id,
                subPins: pr.pins,
            }
        })
    }

    useEffect(() => {
       
        fetch(playRoutes)
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

const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries
});


if (loadError) return 'Error Loading Maps';
if (!isLoaded) return 'Loading Maps';

    return (
        <>
       
            
            <div id='previewMap'>
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
               
                  />
                ))}

           
            </GoogleMap>
        </div>
         <Search  panTo={panTo} />
         <Locate panTo={panTo}/> 
         </>
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
export default PreviewMap





