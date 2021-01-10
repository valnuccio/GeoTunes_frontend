import React from 'react';
import LoginForm from '../components/LoginComponents/LoginForm'
import '../customCss/loginCss.css'
import styled from 'styled-components'

const LoginContainer = (props) => {

    const Container=styled.div`
    z-index:1
    `
    return(
        <Container>
            <LoginForm loginHandler = {props.loginHandler} />
        </Container>
    );
};

export default LoginContainer;