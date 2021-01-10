import React from 'react';
import PreviewMap from './maps/PreviewMap';
import LoginContainer from './LoginContainer';
// import '../customCss/loginCss.css'
import styled from 'styled-components'
import PreviewFootage from '../../src/PreviewFootage.mp4';
import transparentLogo from "../../src/transparentLogo.png";


const PreviewContainer = (props) => {

    const Video=styled.video`
    position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%; 
display:flex;
opacity:.8
    `

    
    
    return (
        <>
            <LoginContainer loginHandler={props.loginHandler} />
            <Video id="background-video" loop autoPlay poster={transparentLogo}>
                <source src={PreviewFootage} type="video/mp4" />
                Your browser does not support the video tag.
            </Video>
        </>
    );
};

export default PreviewContainer;