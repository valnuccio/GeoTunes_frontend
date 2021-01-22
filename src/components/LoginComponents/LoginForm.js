import React, { useState } from 'react';

import { Button, Form} from 'semantic-ui-react'





const LoginForm  = (props) => {





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
        

            <Form  onSubmit={handleUserInfo}>

                

                    <Form.Group widths='equal' style={{display:"flex", flexDirection:'column'} }>
                    
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

                    <br/>
                <br/>
                <Button 
                    id='registerBtn' 
                    class = 'formBtn' 
                    type='Submit'>
                        Login
                </Button>

                <br/>
                <br/>
               

                
                
                    <Button
                        id='registerBtn'
                        class = 'formbtn' 
                        type='SignUp'
                        onClick={props.switchLogin}
                    >
                    Register New User
                    </Button>

                

            </Form>
         
        </>
    )
}



export default LoginForm