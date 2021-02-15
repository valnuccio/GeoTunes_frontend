import React from 'react';

const DirectionsRendered = ({distance}) => {
return(
    <>
    <div id="box" style={{overflow: 'scroll', height: '37vh', background:'rgb(225, 173, 1, 0.8)', borderRadius:'5px', margin:'10px' }}>
        <div id="panel"></div>
    </div>
    </>
)
}

export default DirectionsRendered