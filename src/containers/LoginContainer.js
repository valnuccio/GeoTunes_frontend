import React from 'react';
import LoginForm from '../components/LoginComponents/LoginForm'
import '../customCss/loginCss.css'
import styled from 'styled-components'
import LoginHeader from '../components/LoginComponents/LoginHeader'
const LoginContainer = (props) => {


    const Title = styled.h1`

    `
    const Container=styled.div`
    z-index:1;
    position:relative;
    width:40%;
    margin:05%;
    `
    return(
        <Container>
            <LoginHeader/>
            <LoginForm loginHandler = {props.loginHandler} />
        </Container>
    );
};

export default LoginContainer;