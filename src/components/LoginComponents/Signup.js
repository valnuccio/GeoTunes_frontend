import React, { useState } from 'react';
import { Form, Input, Header, Icon} from 'semantic-ui-react'
import '../../customCss/signUp.css'

const SignUp = (props) => {
    
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
       
    return (
        <div id='signup'>
            <Header as='h1' id='loginHeader'>
                <Icon name='globe' id='loginIcon'/>
                <Header.Content>
                    
                    <h1>GEOTUNES</h1>
                </Header.Content>
            </Header>
             <div id="sign_up_form">
            
               
                    <Form onSubmit={gatherState}>
                        
                            <Form.Field >
                                <label>Username</label>
                                <Input fluid value={username} onChange={updateState} name='username'/>
                            </Form.Field>

                            <Form.Field>
                                <label>Password</label>
                                <Input fluid value={password} onChange={updateState} name='password'/>
                            </Form.Field>
                            
                            <Form.Field>
                                <label>Confirm Password</label>
                                <Input fluid value={confirmation} onChange={updateState} name='confirmation'/>
                            </Form.Field>

                            <Form.Field>
                                <label>Name</label>
                                <Input fluid value={name} onChange={updateState} name='name'/>
                            </Form.Field>

                            <Form.Button content='Submit' id="submitbutton"/>
                        
                    </Form>
                
            
            </div>

            
{/*         
            <form onSubmit={gatherState}>
                <label>UserName</label>
                <input type='text' value={username} onChange={updateState} name='username'/>
                <label>Password</label>
                <input type='password' value={password} onChange={updateState} name="password"/>
                <label>Confirm Password</label>
                <input type='password' value={confirmation} onChange={updateState} name="confirmation"/>
                <label> Name </label>
                <input  value={name} onChange={updateState} name="name"/>
                <br></br>
                <input type='submit'/>
            </form> */}
        </div>
    );

};

export default SignUp;


// <Form onSubmit={gatherState}>
// <Form.Group widths='equal'>
//   <Form.Field>
//     <label>UserName</label>
//     <Input fluid value={username} onChange={updateState} name='username'/>
//   </Form.Field>
//   <Form.Field>
//     <label>Middle name</label>
//     <Input fluid placeholder='Middle name' />
//   </Form.Field>
//   <Form.Field>
//     <label>Last name</label>
//     <Input fluid placeholder='Last name' />
//   </Form.Field>
// </Form.Group>
// </Form>
