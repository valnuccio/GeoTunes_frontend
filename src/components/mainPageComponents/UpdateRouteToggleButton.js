import React, { useState, useEffect } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { getUser, favCreate, playroutes } from '../../railsserver';

const UpdateRouteToggleButton = (props) => {

   
    const [updatedUser, setUpdatedUser] = useState(props.user);
    const [updatedRoute, setUpdatedRoute] = useState(null);
   



    useEffect(() => {
        fetch(getUser, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(user => setUpdatedUser(user.user))

        fetch(playroutes + props.routeID, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(route => setUpdatedRoute(route))
    }, [])

    const isFavorited = () => {
        let routeIDS = updatedUser.fav_routes.map(r => r.play_route_id)
        return !routeIDS.includes(props.routeID)
    }
    
    const [editSaveToggle, toggleEditSave] = useState(true);
    const [favToggle, setFavToggle] = useState(isFavorited());
    
    const isRouteMine = () => {

        let myRoutes = updatedUser.play_routes.map( p => p.id);

        return  myRoutes.includes(props.routeID) ? (true) : (false);
    }

    const favRoute = () => {
        if (isFavorited()) {
            fetch(favCreate, {
                method: 'POST',
                headers: { 
                    Accepts: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({play_route_id: props.routeID, user_id: updatedUser.id})
            })
            .then()
            .then()
            
        }

        setFavToggle(false)
        setUpdatedRoute(current => ({users: [...current.users, 'who cares']}))
        
    }

    const unFavRoute = () => {
        if (!isFavorited()) {
            let favOBJ = updatedUser.fav_routes.find(r => r.play_route_id === props.routeID)
            console.log('favid', favOBJ.id)
            fetch(`${favCreate}/${favOBJ.id}`, {
                method: 'DELETE',
                headers: { 
                    Accepts: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then()
            .then()
            
        } 

        setFavToggle(true)
        setUpdatedRoute(current => {
            let oneLess = current.users.slice(0, - 1)
            console.log(oneLess)
            
            return {users: oneLess}
        })
    }

    return(
        updatedUser && isRouteMine() ? 
        (  
        <> 
            {editSaveToggle ? (
                <Button 
                    as='div' 
                    labelPosition='right'
                    onClick={() => {
                        toggleEditSave(current => !current)
                        props.toggle()
                    }}
                >
                        <Button
                            style={{width: '100%'}}
                            color= 'blue'>
                                <Icon name='edit' />
                                Edit My Route
                        </Button>

                        <Label 
                            as='a' 
                            color='blue' 
                            pointing='left'>
                        </Label>

                </Button>
            ) 
            : (
                <Button 
                    as='div' 
                    labelPosition='right'
                    onClick={() => {
                        toggleEditSave(current => !current);
                        props.toggle();
                        props.patch()
                    
                    }}
                >
                        <Button 
                            style={{width: '100%'}}
                            color='green'
                            id='saveButton'
                            >
                            
                            <Icon name='edit' />
                            Save my Route
                        </Button>

                        <Label 
                            as='a' 
                            basic color='green' 
                            pointing='left'>
                            <Icon name='headphones' />
                        </Label>
                </Button>
            )}
            
            
        </>  
        ) 
        : 
        (
            updatedUser && favToggle ? (
                <Button onClick={favRoute} as='div' labelPosition='right'>

                    <Button id="fave-button" color='red'>
                        <Icon id="fave-button" name='heart' />
                        Favorite This Route
                    </Button>
                    
                        <Label as='a' basic color='red' pointing='left' id="fave-button">
                            {updatedRoute && updatedRoute.users ? updatedRoute.users.length : null}
                        </Label>
                </Button>
            ) : (
                <Button onClick={unFavRoute} as='div' labelPosition='right'>
                    <Button id="fave-button" color='red'>
                        <Icon id="fave-button" name='heart' />
                        Unfavorite This Route
                    </Button>

                        <Label as='a' basic color='red' pointing='left' id="fave-button">
                        {updatedRoute && updatedRoute.users ? updatedRoute.users.length : null}
                        </Label>
                </Button>
            )
        )
    )
        
    
}

export default UpdateRouteToggleButton

