import React, {useEffect, useState} from 'react';

import LoginContainer from './LoginContainer';
// import '../customCss/loginCss.css'
import styled from 'styled-components'

import PreviewPageVid from '../components/PreviewPageVid.js';
import Signup from '../components/LoginComponents/Signup'

const PreviewContainer = (props) => {



   
const Container=styled.div`
    height:100%;
    width:100%;
    position:absolute;
    justify-content:center;
    align-items: center;
    background: #202020;
    

`

    
    
    return (
        <Container>
            <LoginContainer fromPreview={props.fromPreview} loginHandler={props.loginHandler} signUpHandler={props.signUpHandler}/>
            <PreviewPageVid />
          
        </Container>
    );
};

export default PreviewContainer;