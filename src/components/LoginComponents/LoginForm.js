import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form} from 'semantic-ui-react'
import styled from 'styled-components';

const padding={
    marginTop:'20px'
}   

const LoginForm  = (props) => {



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
        

            <LoginInputForm  onSubmit={handleUserInfo}>

                

                    <Form.Group widths='equal'>
                    
                        <Form.Input 
                            className='formText' 
                            type='text' 
                            fluid 
                            label='Username' 
                            placeholder='Username' 
                            value={username} 
                            onChange={updateState} 
                            name="username"
                        />
                        <Form.Input 
                            className='formText' 
                            type='password' fluid label='Password' 
                            placeholder='Password' 
                            value={password} 
                            onChange={updateState} 
                            name="password"
                        />
                    </Form.Group>

                <Button style={padding} class = 'formBtn' type='Login'>Login</Button>

                <br/>

                <Link to='/signUp' type ='button'>

                    <Button
                        id='registerBtn'
                        class = 'formbtn' 
                        type='SignUp'
                    >
                    Register New User
                    </Button>

                </Link>

            </LoginInputForm>
         
        </>
    )
}



export default LoginForm