import React, {useState, useEffect} from 'react';
import LoginForm from '../components/LoginComponents/LoginForm';

import styled from 'styled-components';
import Header from '../components/mainPageComponents/Header';
import SignupForm from '../components/LoginComponents/SignupForm';


const Container=styled.div`
z-index:1;
position:relative;
width:40%;
margin:05%;
`

const LoginContainer = (props) => {


    const [login, setLogin] = useState(false)

    useEffect(()=>{
        if(props.fromPreview){ setLogin(true)}

    }
        ,[props.fromPreview])

 
  
    


const switchLogin=()=>{
    setLogin(!login)
}

    return(
        <Container>
            <Header page={"login"}/>

            {login?<LoginForm  loginHandler = {props.loginHandler} switchLogin={switchLogin}/>:<SignupForm fromPreview={true} switchLogin={switchLogin} signUpHandler={props.signUpHandler}/>}

        </Container>
    );
};

export default LoginContainer;