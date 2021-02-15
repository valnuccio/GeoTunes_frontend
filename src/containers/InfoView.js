import React from 'react';
import { NavLink } from 'react-router-dom'

import {Button } from 'semantic-ui-react';
import ShowMap from "./maps/ShowMap";
import "@reach/combobox/styles.css";






const InfoView = (props) => {

    

    


    return(
        <>
        <h3>
            
        </h3>
            <ShowMap routeId={props.routeID} infoView={true} getData={()=> null} getCords={() => null} showMarkers={props.showMarkers}/>
            
                <NavLink to={`/routes/${props.routeID}`} > 
                    <Button
                    style={{width: '100%'}}
                     primary>
                        Listen to Route
                    </Button>
                </NavLink>
            
            </>
    )

}

export default InfoView