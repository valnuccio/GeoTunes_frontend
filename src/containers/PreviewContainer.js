import React from 'react';
import PreviewMap from './maps/PreviewMap';
import LoginContainer from './LoginContainer';
// import '../customCss/loginCss.css'
import styled from 'styled-components'
import StockFootage from '../../src/StockFootage.mp4';
import PreviewFootage from '../../src/PreviewFootage.mp4'
import transparentLogo from "../../src/transparentLogo.png";
import PreviewPageVid from '../components/PreviewPageVid.js';

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
            <LoginContainer loginHandler={props.loginHandler} />
            <PreviewPageVid />
            {/* <Video id="background-video" loop autoPlay poster={transparentLogo}>
                <source src={StockFootage} type="video/mp4" />
                <source src={PreviewFootage} type="video/mp4" />
                Your browser does not support the video tag.
            </Video> */}
        </Container>
    );
};

export default PreviewContainer;