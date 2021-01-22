import React, { useState } from 'react';
import { Form, Input, Header, Icon} from 'semantic-ui-react';
import styled from 'styled-components';
import SignupForm from '../LoginComponents/SignupForm';
import PreviewPageVid from '../PreviewPageVid'

const SignUp = (props) => {
    
   
       
    const BigContainer = styled.div`
    width:100vw;
    height:100vh;
    
    `
    const Page= styled.div`
    background: rgb(169,169,169);
    background: linear-gradient(90deg, rgba(169,169,169,1) 0%, rgba(242,242,242,1) 100%);
    width:100vw;
    height:100vh;
    `

    const LittleContainer= styled.div`
    width:70%;
    position:relative;
    left:5vw;
    
    background: rgb(169,169,169);
background: linear-gradient(350deg, rgba(169,169,169,1) 0%, rgba(52,52,52,0.8393732492997199) 92%);
    z-index:1;
    border-radius: 12% / 50%;
    padding:5% 5%;
    box-shadow: 0 40px 40px rgba(0,0,0,1)
    `

    const VidContainer=styled.div`
    `

    const Title=styled.h1`
    
    
     
    `


    return (
        <Page>
        <BigContainer>
            
                <Icon name='globe' id='loginIcon'/>
                        <Title>GEOTUNES</Title>
          
            <LittleContainer>
                 <SignupForm signUpHandler={props.signUpHandler}/>
            </LittleContainer>
            {/* <VidContainer>
                 <PreviewPageVid/>
            </VidContainer> */}


                   
            

            

        </BigContainer>
       </Page>
    );

};

export default SignUp;



