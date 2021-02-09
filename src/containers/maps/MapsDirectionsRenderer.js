import { DirectionsRenderer} from '@react-google-maps/api';
import React,{useState, useEffect } from 'react';


/* global google */

function MapDirectionsRenderer(props) {
  
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
       props.getCords(props.places)
    }, [props.places])


  
    useEffect(() => {
      
      const {places} = props;
    
      const waypoints = places.map(p => ({
        location: { lat: p.lat, lng: p.lng},

      }));
    
      
      
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;
      
      const directionsService = new google.maps.DirectionsService();
      const routeValues=    {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: waypoints,
      }

      
        
      

      directionsService.route( routeValues,
        (result, status) => {
        
          if (status === google.maps.DirectionsStatus.OK) {
            if(result!==directions){
              setDirections(result);
              if(props.getData !== null){
                props.getData(result)
              }
          } 
            else {
            setError(result);
          }
        }
      }
      );
    }, [props.places]);
  
    if (error) {
      return <h1>{error}</h1>;
    }
    // return null
    return (
      directions && (
        <>
        <DirectionsRenderer directions={directions} panel={ document.getElementById('panel') } onDirectionsChanged={() => console.log()} options ={{
          draggable: true,
          suppressMarkers: true,
          markerOptions: {
            label: 'ahhhhhh',
           
          }

        }}  />
       
      </>
      )
    );
  }
  
  export default MapDirectionsRenderer