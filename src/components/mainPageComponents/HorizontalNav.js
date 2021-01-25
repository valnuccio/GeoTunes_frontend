import React from 'react';

import 'react-spotify-auth/dist/index.css';

import "@reach/combobox/styles.css";
import styled from 'styled-components';



import { Button } from 'semantic-ui-react';


const HorizontalNav = (props) =>{


const ButtonContainer=styled.div`
width:20vw;
margin-left:7vw;

`
    return(
        <>
                {props.user? <h3>Welcome {props.user.user.name}</h3>:null}
                                    <ButtonContainer>
                                        <Button onClick = {props.logOutHandler}> Sign out</Button>
                                     </ButtonContainer> 
         </>
    )
}

export default HorizontalNav