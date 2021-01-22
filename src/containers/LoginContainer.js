import React, {useState, useEffect} from 'react';
import LoginForm from '../components/LoginComponents/LoginForm';
import '../customCss/loginCss.css';
import styled from 'styled-components';
import LoginHeader from '../components/LoginComponents/LoginHeader';
import SignupForm from '../components/LoginComponents/SignupForm';

const LoginContainer = (props) => {
    const [login, setLogin] = useState(false)

    useEffect(()=>{
        if(props.fromPreview){ setLogin(true)}

    }
        ,[props.fromPreview])

    const Title = styled.h1`

    `
    const Container=styled.div`
    z-index:1;
    position:relative;
    width:40%;
    margin:05%;
    
    `


const switchLogin=()=>{
    setLogin(!login)
}

    return(
        <Container>
            <LoginHeader/>

            {login?<LoginForm loginHandler = {props.loginHandler} switchLogin={switchLogin}/>:<SignupForm fromPreview={true} switchLogin={switchLogin} signUpHandler={props.signUpHandler}/>}

        </Container>
    );
};

export default LoginContainer;