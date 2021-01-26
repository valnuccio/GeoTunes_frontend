import React, {useEffect, useState} from 'react';

const DirectionsInfo = ({distance}) =>{

    const [loadedDistance, setLoadedDistance] = useState(null)


    useEffect(()=>{
        
        if(distance){
        setLoadedDistance(distance)
        }
    },
    [distance]
    )


return(
 


    <div id="other_info">

        <div id="other_info_bit">
            <h3>Total Distance:</h3>
                <p>{distance}</p>
        </div>
        <div id="other_info_bit">
            <h3>Time to Walk:</h3>
                <p>{`${parseFloat(distance) * 20}` } minutes</p>
        </div>
    </div>

)
}

export default DirectionsInfo