import React, { useState } from 'react';
import { Form, Input, Header, Icon} from 'semantic-ui-react';
import styled from 'styled-components';
import SignupForm from '../LoginComponents/SignupForm';

const SignUp = (props) => {
    
   
       
    const BigContainer = styled.div`
    width:100vw;
    height:100vh;
    `

    const LittleContainer= styled.div`
    width:70%;
    position:relative;
    left:5vw;
    `
    return (

        <BigContainer>
            <Header as='h1' id='loginHeader'>
                <Icon name='globe' id='loginIcon'/>
                    <Header.Content>
                        
                        <h1>GEOTUNES</h1>
                    </Header.Content>
            </Header>
            <LittleContainer>
                 <SignupForm signUpHandler={props.signUpHandler}/>
            </LittleContainer>


                   
            

            

        </BigContainer>
    );

};

export default SignUp;



