import React from 'react';
import LoginForm from '../components/LoginComponents/LoginForm'
import '../customCss/loginCss.css'

const LoginContainer = (props) => {
    return(
        <div>
            <LoginForm loginHandler = {props.loginHandler} />
        </div>
    );
};

export default LoginContainer;