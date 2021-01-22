import React, { useState } from 'react';
import { Form, Input} from 'semantic-ui-react';

const SignupForm = (props) =>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [name, setName] = useState('');
    
    
    const updateState = (e) =>{

        switch(e.target.name) {
            case "username":
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'confirmation':
                setConfirmation(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            default:
                break
        } 
    }
  

    const gatherState = (e) =>{
        e.preventDefault();
        
        if( password === confirmation) { 
              
            props.signUpHandler({
                username: username,
                password: password, 
                name: name
            });

            setUsername('');
            setPassword('');
            setConfirmation('');
            setName('');

        } else {
            alert('passwords dont match');
        }

    }
return(
    
     <Form onSubmit={gatherState}>
                        
                        <Form.Field >
                             <label>Username</label>
                             <Input fluid value={username} onChange={updateState} placeholder={"Username"}name='username'/>
                        </Form.Field>

                        <Form.Field>
                             <label>Password</label>
                             <Form.Input className="formText" value={password} type="password" placeholder={"Password"} onChange={updateState} name='password'/>
                        </Form.Field>
                            
                        <Form.Field>
                            <label>Confirm Password</label>
                            <Form.Input className="formText" value={confirmation} type="password" placeholder={"Confirm Password"}onChange={updateState} name='confirmation'/>
                        </Form.Field>

                        <Form.Field>
                            <label>Name</label>
                            <Input fluid value={name} onChange={updateState} placeholder={"Name"}name='name'/>
                        </Form.Field>

                         <Form.Button id="registerBtn" class='formbtn' type='Submit'> Submit</Form.Button>
                        
                    
                          <Form.Button
                          id='registerBtn'
                          class = 'formbtn' 
                          type='SignUp'
                          onClick={props.switchLogin}
                      >
                      Already have an Acct? Login
                      </Form.Button>
                        
                        
                    </Form>
                
            

    

)
}

export default SignupForm