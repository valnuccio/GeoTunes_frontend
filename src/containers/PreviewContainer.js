import React from 'react';
import PreviewMap from './maps/PreviewMap';
import LoginContainer from './LoginContainer';
import '../customCss/loginCss.css'

const PreviewContainer = (props) => {
    return (
        <>
            <LoginContainer loginHandler={props.loginHandler} />
            <PreviewMap />
        </>
    );
};

export default PreviewContainer;