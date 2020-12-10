import React from 'react';

import ViewMap from './maps/ViewMap'
import 'react-spotify-auth/dist/index.css'
import { 
    Segment, 
    List ,
    Header,
    Icon,
    Button

} from 'semantic-ui-react'
import '../../src/customCss/homeCss.css'

const HomeContainer = (props) =>{
   

    return(
        <div>
            {/* <h1> Welcome {props.user.user.name} {console.log('currentUserInhomePageData:', props.user)} </h1> */}
            <Header id='logoHeader' as='h2' icon>
                        <Icon name='globe' />
                        {props.user.user.name}'s Homepage
                        {/* <Header.Subheader id='logoSubHeader'>
                            click on any pin to preview play route
                        </Header.Subheader> */}
            </Header>
            <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>

        </div>
    );
};

export default HomeContainer;