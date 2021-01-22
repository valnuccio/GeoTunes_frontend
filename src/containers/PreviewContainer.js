import React from 'react';

import LoginContainer from './LoginContainer';

import styled from 'styled-components'

import PreviewPageVid from '../components/PreviewPageVid.js';



const Container=styled.div`
    height:100%;
    width:100%;
    position:absolute;
    justify-content:center;
    align-items: center;
    background: #202020;
    

`
const PreviewContainer = (props) => {



   


    
    
    return (
        <Container>
            <LoginContainer fromPreview={props.fromPreview} loginHandler={props.loginHandler} signUpHandler={props.signUpHandler}/>
            <PreviewPageVid />
          
        </Container>
    );
};



export default PreviewContainer;