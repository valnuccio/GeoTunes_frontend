import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import styled from 'styled-components';
import LoginHeader from './LoginHeader';





const LoginForm  = (props) => {

    const LoginBackDrop = styled.div`
      background:#00563B;
      border-radius: 10px;
      padding: 20px;
      border-style:outset;
    `;

    const LoginInputForm = styled.div`
    display:flex;
    flex-direction:column;
    `;


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    
    
    const updateState = (e) =>{

        switch(e.target.name) {

            case "username":
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break
        };
    };

    const handleUserInfo = (e) =>{
        e.preventDefault();

        let userObj = {
            username: username,
            password: password
        };

        props.loginHandler(userObj);

        setUsername('');
        setPassword('');
    };

    
    return(
        <>
        {/* <LoginBackDrop> */}

            <LoginInputForm  onSubmit={handleUserInfo}>

                <LoginHeader />

                    <Form.Group widths='equal'>
                    
                        <Form.Input 
                            className='formText' 
                            type='text' 
                            fluid 
                            label='Username' 
                            placeholder='username' 
                            value={username} 
                            onChange={updateState} 
                            name="username"
                        />
                        <Form.Input 
                            className='formText' 
                            type='password' fluid label='Password' 
                            placeholder='password' 
                            value={password} 
                            onChange={updateState} 
                            name="password"
                        />
                    </Form.Group>

                <Button class = 'formBtn' type='Login'>Login</Button>

                <br/>

                <Link to='/signUp' type ='button'>

                    <Button
                        id='registerBtn'
                        class = 'formbtn' 
                        type='SignUp'
                    >
                    Or Click to Register
                    </Button>

                </Link>

            </LoginInputForm>
            
        {/* </LoginBackDrop> */}
        </>
    )
}

export default LoginForm