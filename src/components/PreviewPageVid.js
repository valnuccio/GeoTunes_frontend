import React from 'react';
import ReactPlayer from 'react-player';
import PreviewFootage from '../../src/PreviewFootage.mp4';
import styled from 'styled-components';

const PreviewPageVid = () =>{

    const Video=styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%; 
    display:flex;
    opacity:.8
    `


    return(
        <Video>
            <ReactPlayer id="preview-video" width="100%" height="100%" loop={true} playing={true} volume={0}  muted={true} url={PreviewFootage} type="video/mp4"/>
        </Video>
    )

}

export default PreviewPageVid