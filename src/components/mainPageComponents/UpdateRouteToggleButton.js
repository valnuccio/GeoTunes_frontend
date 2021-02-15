import React, { useState, useEffect } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { getUser, favCreate, playroutes } from '../../railsserver';
import styled from 'styled-components';

const StyledButton=styled(Button)`
width:100%;
position:relative;
margin:5px;

`



const UpdateRouteToggleButton = (props) => {
  const [cords, setCords] = useState(props.cords);
  const [updatedUser, setUpdatedUser] = useState(props.user);
  const [updatedRoute, setUpdatedRoute] = useState(null);

  useEffect(() => {
    setCords(props.cords);
  }, [props.cords]);

  useEffect(() => {
    fetch(getUser, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((r) => r.json())
      .then((user) => setUpdatedUser(user.user));

    fetch(playroutes + props.routeID, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((r) => r.json())
      .then((route) => setUpdatedRoute(route));
  }, []);

  const isFavorited = () => {
    const routeIDS = updatedUser.fav_routes.map((r) => r.play_route_id);
    return !routeIDS.includes(props.routeID);
  };

  const [editSaveToggle, toggleEditSave] = useState(true);
  const [favToggle, setFavToggle] = useState(isFavorited());

  useEffect(()=>{
    setFavToggle(isFavorited())
  },[updatedUser])

  const isRouteMine = () => {
    const myRoutes = updatedUser.play_routes.map((p) => p.id);
    return !!myRoutes.includes(props.routeID);
  };

  const favRoute = () => {
    if (isFavorited()) {
      fetch(favCreate, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ play_route_id: props.routeID, user_id: updatedUser.id }),
      })
        .then()
        .then();
    }
    setFavToggle(false);
    setUpdatedRoute((current) => ({ users: [...current.users, 'who cares'] }));
  };

  const unFavRoute = () => {
    if (!isFavorited()) {
      const favOBJ = updatedUser.fav_routes.find((r) => r.play_route_id === props.routeID);

      fetch(`${favCreate}/${favOBJ.id}`, {
        method: 'DELETE',
        headers: {
          Accepts: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then()
        .then();
    }

    setFavToggle(true);

    setUpdatedRoute((current) => {
      const oneLess = current.users.slice(0, -1);
      return { users: oneLess };
    });
  };

  return (
    updatedUser && isRouteMine() ? (
      <>
        {editSaveToggle ? (
          <StyledButton
            as="div"
            labelPosition="right"

            onClick={() => {
              toggleEditSave((current) => !current);
              props.toggle();
            }}
          >

            <Button
              style={{ width: '100%' }}
              color="blue"
            >

              <Icon name="edit" />
              Edit My Route

            </Button>

           
          </StyledButton>

        ) : (
          <StyledButton
            as="div"
            labelPosition="right"
            onClick={() => {
              toggleEditSave((current) => !current);
              props.toggle();
              props.patch();
            }}
          >

            <Button
              style={{ width: '100%' }}
              color="green"
              id="saveButton"
            >

              <Icon name="edit" />
              Save my Route
            </Button>

          
          </StyledButton>
        )}

      </>
    ) : (
      updatedUser && favToggle ? (

        <StyledButton
          onClick={favRoute}
          as="div"
          labelPosition="right"
        >

          <Button
            id="fave-button"
            color="red"
            style={{ width: '100%', display:'flex', position:'relative', fontSize:'20px', alignItems:'center', justifyContent:'center'}}
          >
           <Icon
              id="fave-button"
              name="heart"
              style={{ position:'absolute', left:'8px', height:'40px', top:'0px', zIndex:'1', display:'flex', alignItems:'center' }}
            />
           
            Favorite
            
          </Button>
          <div>
            <Label as="a" basic color="red" pointing="left" id="fave-button" style={{ position:'absolute', right:'0px', height:'40px', top:'0px', zIndex:'1', display:'flex', alignItems:'center' }}>
            <h4>{updatedRoute && updatedRoute.users ? updatedRoute.users.length : null}</h4>
          </Label>
          </div>
        
        </StyledButton>

      ) : (

        <StyledButton
          onClick={unFavRoute}
          as="div"
          labelPosition="right"
        >
          <Button
            id="fave-button"
            color="red"
            style={{ width: '100%', display:'flex', position:'relative', fontSize:'20px', alignItems:'center', justifyContent:'center'}}
          >
            <Icon
              id="fave-button"
              name="heart"
              style={{ position:'absolute', left:'8px', height:'40px', top:'0px', zIndex:'1', display:'flex', alignItems:'center' }}
            />
           
            Unfavorite This Route
          </Button>
         <div>
          <Label
            as="a"
            basic
            color="red"
            pointing="left"
            id="fave-button"
            style={{ position:'absolute', right:'0px', height:'40px', top:'0px', zIndex:'1', display:'flex', alignItems:'center' }}
          >
            {updatedRoute && updatedRoute.users ? updatedRoute.users.length : null}
           
          </Label>
        </div>
        </StyledButton>
      )
    )
  );
};

export default UpdateRouteToggleButton;