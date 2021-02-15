import React, {useState, useCallback, useRef, useEffect} from 'react';
import mapStyle from '../../customCss/mapStyle';
import styled from 'styled-components';
import {Button} from 'semantic-ui-react';
import Locate from '../../components/MapComponents/Locate'

import {
    GoogleMap,
    useLoadScript,
    Marker,
    

} from '@react-google-maps/api';
import MapsDirectionsRenderer from './MapsDirectionsRenderer';
import "@reach/combobox/styles.css";



const libraries = ['places'];



const ResetButtonDiv = styled.div`
width:15vw;
position:absolute;
top:20px;
z-index:1;
`


const StyledButton = styled(Button)`
width:100%;

margin:5%;
`


const options  = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,

};

const MapDiv = styled.div`
position:relative;
width:auto;

`


const ShowMap = (props) => {
    const [markers, setMarkers] = useState([]);
    // const [isDraggable, setDrag] = useState(false);
   
   
   

    // listening for changes in the marker values
    useEffect(() => {
        setMarkers(props.showMarkers)
    }, [props.showMarkers])

    // listening for changes in if the markers are draggable
    // useEffect(() => {
    //     setDrag(props.draggableVal)

    // }, [props.draggableVal])
 
    const mapContainerStyle = {

        // this map is being doubled on the show page and also used on the infobox view. hence the different sizes here. 
        // width: '100%',
       
        width: props.infoView? '30vw':'70vw',
        height: props.infoView ? '30vh' : '100vh',
    };

    const center = props.infoView ? ({

        // center the view on the first stop in the route
        lat: props.showMarkers[0].lat,
        lng: props.showMarkers[0].lng,
    })
    : 
    // if not loaded show middle of manhattan
    (
        {
            lat: 40.7128,
            lng: -74.0060,
        }
    )

  

  




    
    const mapRef = useRef();

    const onMapLoad= useCallback((map)=>{
        mapRef.current=map; 
    },[])



    // for panning if I want to use it later

    const panTo = useCallback(({lat, lng})=> {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    },[]);

 

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries
    });


    if (loadError) return 'Error Loading Maps';
    if (!isLoaded) return 'Loading Maps';
// is returned only once it is loaded

console.log(props)
    return (
        
        <MapDiv infoView={props.infoView}>
           {props.home? 
           
            <ResetButtonDiv>
                <StyledButton onClick={props.resetMap}>Reset Map</StyledButton>
            </ResetButtonDiv>:null
            }
            {props.infoView?null:
            <Locate panTo={panTo} options={options} />}
            <GoogleMap
                mapContainerStyle={mapContainerStyle} //defined above
                center={center} //defined above
                zoom={12}
                options={options} //defined above
                draggable={props.isDraggable}
                onLoad={onMapLoad} //defined above
            
                   
            >

            {/* {plots the markers on the map} */}
                { markers.map((marker, i) => (
                    
                <Marker 
                
                key={i} 
                id={i}
                position={{lat: marker.lat, lng: marker.lng}}
                
                icon={{
                    url:'/Sound-Wave-Headphones.svg', 
                    scaledSize: new window.google.maps.Size(30,30), 
                    origin: new window.google.maps.Point(0,0), 
                    anchor: new window.google.maps.Point(15,15),
                   
                }}
               

                    onDragEnd={(e) => {
                        marker.lat = e.latLng.lat();
                        marker.lng = e.latLng.lng();
                        let updatedMarkers = [...markers];
                        updatedMarkers[marker.id] = marker
                        setMarkers(updatedMarkers);
                        
                    }} 
                    />
                ))}


              {/* render that route */}
               {markers.length>1? <MapsDirectionsRenderer
                   places={markers}
                    getCords ={props.getCords}
                    getData={props.getData}
                    
                    /> : null} 
            
             


            </GoogleMap>
           
        </MapDiv>    
        
    );
}



export default ShowMap