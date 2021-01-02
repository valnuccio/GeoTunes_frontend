import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router";
import SignUp from './components/LoginComponents/Signup';
import HomeContainer from './containers/HomeContainer';
import PreviewContainer from './containers/PreviewContainer';
import CreateMap from './containers/maps/CreateMap';
import RoutesContainer from './containers/RoutesContainer';
import {getUser as getUserRoute, users as userRoute, login as loginRoute} from './railsserver';
import ProfileContainer from './containers/ProfileContainer';

const App = (props) => {


    const history = useHistory();
    const [user, setUser] = useState('init');

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
        fetch(getUserRoute, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then(matchedUser => {
          setUser(matchedUser)
        });

      } else {
        setUser(null)
      };
    }, []);

    const logOutHandler = () => {
      console.log('logoutHandler')
      localStorage.clear();
      history.push('/');
      setUser(null);
    };

    const loginHandler = (userInfo) => {

      const options ={
        method:'POST',
        headers: {
          'content-type':'application/json',
          'accept':'application/json'
        },
        body: JSON.stringify({user: userInfo})
      };

      fetch(loginRoute, options)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error('User Invalid');
        }
      })
      .then((existingUserInfo) => {
            setUser(existingUserInfo);
            localStorage.setItem("token", existingUserInfo.jwt);
            history.push('/home')
      })
      .catch((error) => {
        alert(error)
      });

    };

 
    const signUpHandler = (userObj) =>{
      
      const options ={
        method:'POST',
        headers: {
            'content-type':'application/json',
            'accept':'application/json'
          },
          body: JSON.stringify({user: userObj})
        };


    fetch(userRoute, options)
    .then(resp => resp.json())
    .then(newUserInfo => {

      if(newUserInfo.jwt){
        localStorage.setItem("token", newUserInfo.jwt);
        setUser(newUser)
        history.push('/home')
      }else {
        let error=newUser
        let keys= Object.keys(error)
        let errorMessage= keys.map(
          (key) => `${key} ${error[key][0]}`)
          alert(errorMessage)
          
      }
    });
   
  };

  const render = () => {

    if(user === 'init') {
      return <h2> </h2>

    } else if(!user) {
      return (
        <Switch>
          <Route path='/signup' render={() => <SignUp signUpHandler={signUpHandler}/>}/>
          <Route path="/" render={() => <PreviewContainer history={history} loginHandler={loginHandler}/>}/> 
          

        </Switch>
      )

    } else {
      return (
        <Switch>
          
          <Route path='/home' render={() => <HomeContainer history = {history}  user={user} logOutHandler={logOutHandler}/>}/>
          <Route  path="/create" render={() => <CreateMap history={history} user={user} logOutHandler={logOutHandler}/>}/> 
          <Route  path="/routes/:id" render={(routerProps) => {
              let id = parseInt(routerProps.match.params.id)
              return <RoutesContainer user={user} routerID={id} logOutHandler={logOutHandler} />
          }}/> 
          
          <Route  path="/routes" render={() => {

            return <RoutesContainer user={user} routerID={localStorage.getItem('currentRoute')} logOutHandler={logOutHandler} />
           
          }}/>
          <Route path='/profile/:id' render= {(rProps) => {
            let id = parseInt(rProps.match.params.id)

            return <ProfileContainer userID = {id} user={user} logOutHandler={logOutHandler} />
          }} />
          <Route path='/' render={() => <HomeContainer history = {history}  user={user} logOutHandler={logOutHandler}/>}/>
        </Switch> 
      )
    }; 
  };


  return render();
}

export default App;
 