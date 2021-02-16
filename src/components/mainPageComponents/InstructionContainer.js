import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
width:99%;
height:5vh;
position:absolute;
border-radius:5px;
top:40vh;
right:0vw;
width:15vw;
background-color:rgb(225, 173, 1, 0.8);
height:40vh;
justify-content:center;
alignItems:center;

padding:1em;
z-index:1
`

const InstructionContainer = () =>{
return (
    
    <Container>
        
        <h3>Click On Map To Set Waypoints</h3>
        <br></br>
        <h3>Press <kbd>Esc</kbd> to Clear and Start Again</h3>
    </Container>
)


}

export default InstructionContainer