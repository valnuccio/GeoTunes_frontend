import React, {useState, useCallback, useRef, useEffect} from 'react';
import mapStyle from '../../customCss/mapStyle';


import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,

} from '@react-google-maps/api';
import { formatRelative } from "date-fns";
import MapsDirectionsRenderer from './MapsDirectionsRenderer';
import "@reach/combobox/styles.css";
import '../../customCss/map.css';

//import { playroutes as playRoutes } from '../../railsserver'
//import{
    //     Combobox,
    //     ComboboxInput,
    //     ComboboxPopover,
    //     ComboboxList,
    //     ComboboxOption,
    // } from "@reach/combobox";

    // import usePlacesAutoComplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";

const libraries = ['places'];




const options  = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,

};


const ShowMap = (props) => {
    const center = props .infoView ? ({
        lat: props.showMarkers[0].lat,
        lng: props.showMarkers[0].lng,
    })
    : (
        {
            lat: 40.7128,
            lng: -74.0060,
        }
    )

    const mapContainerStyle = {
        width: '90vw',
        height: props.infoView ? '50vh' : '58vh',
    };

    
    
    useEffect(() => {
        setMarkers(props.showMarkers)
    }, [props.showMarkers])
    useEffect( () => {
        document.addEventListener("keydown", () => removePin(), false);
    }, [])


    const [isDraggable, setDrag] = useState(false);

    useEffect(() => {
        setDrag(props.draggableVal)

    }, [props.draggableVal])

    const removePin = (e) => {
        if (document.querySelector('#saveButton')) {
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

    // const panTo = useCallback(({lat, lng})=> {
    //     mapRef.current.panTo({lat, lng});
    //     mapRef.current.setZoom(14);
    // },[]);

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDyHRdd4NQOPirfP_EtTiiK7TTHn1ySYZg',
        libraries
    });


    if (loadError) return 'Error Loading Maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <div>

            
            
            {/* <Locate panTo={panTo}/>  */}
            <div id='showMap'>

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            
                   
            >
                { markers.map((marker, i) => (
                    
                <Marker 
                draggable={isDraggable}
                key={i} 
                id={i}
                position={{lat: marker.lat, lng: marker.lng}}
                //draggable= {true}
                icon={{
                    url:'/Sound-Wave-Headphones.svg', 
                    scaledSize: new window.google.maps.Size(30,30), 
                    origin: new window.google.maps.Point(0,0), 
                    anchor: new window.google.maps.Point(15,15),
                   
                }}
                // onClick={()=>{
                //     setSelected(marker);
                //     }}

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
                {/* {markersdiv.length>1 ? console.log("this is markers:", markers): null } */}
               {markers.length>1? <MapsDirectionsRenderer
                   places={markers}
                    getCords ={props.getCords}
                    getData={props.getData}
                    /> : null} 
            
               

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
            {/* {console.log('att the bottom fresh render', markers)} */}
            
        </div>
    );
}


// const Locate= ({panTo}) =>{
//     return (
//     <button className="locate" onClick={()=>{
//         navigator.geolocation.getCurrentPosition((position)=>{
//             panTo({
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             });
//         }, () => null, options);
//     }}>
//         <img src="compass.svg" alt="compass - locate me"/>
//     </button>
//     );
// } 


export default ShowMap