import React, {useState, useEffect} from 'react';
import { getUser, favCreate, playroutes } from '../../railsserver';
import { Button, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components'



const Container=styled.div`
width:100%;
`

const FavButton = (props) =>{

    const [updatedUser, setUpdatedUser] = useState(props.user);

    const isFavorited = () => {
        
        if(updatedUser!==null){
            
        let routeIDS = user.fav_routes.map(r => r.play_route_id)
        return routeIDS.includes(props.routeID)
        }
    }

    const[user, setUser] = useState(null)
    const[toggleFav,setToggleFav]= useState(null)

    useEffect(()=>{
        fetch(getUser, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(user => setUser(user.user))


    },[])

 




const favRoute = () => {
       

        
        
        
        fetch(favCreate, {
            method: 'POST',
            headers: { 
                Accepts: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({play_route_id: props.routeID, user_id: user.id})
        })
        .then().then(
        console.log('done')
        )

        fetch(getUser, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(user => setUser(user.user))
       

            // setToggleFav(true)
            // setUpdatedRoute(current => ({users: [...current.users, 'who cares']}))
        

        
        
    }


if (user && toggleFav===false){
return (
    <Container>
            <Button 
            onClick={favRoute} 
            as='div' labelPosition='right'>
            
                <Button id="fave-button" color='red'>
                    <Icon id="fave-button" name='heart' />
                    Favorite This Route
                </Button>
                
                    <Label as='a' basic color='red' pointing='left' id="fave-button">
                    {props.updatedRoute && props.updatedRoute.users ? props.updatedRoute.users.length : null}


                    </Label>

                    
            </Button>
            </Container>
)} else if(updatedUser && toggleFav===true){
return (

            <Container>
                    <Button 
                    // onClick={unFavRoute} 
                    as='div' 
                    labelPosition='right'>
                            <Button id="fave-button" color='red'>
                                <Icon id="fave-button" name='heart' />
                                Unfavorite This Route
                            </Button>

                            <Label as='a' basic color='red' pointing='left' id="fave-button">
                            {props.updatedRoute && props.updatedRoute.users ? props.updatedRoute.users.length : null}
                            </Label>
                    </Button>


            </Container>)
} else {
    return null
}


}

export default FavButton