

import logo from './logo.svg';
import './App.css';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import {Button} from '@material-ui/core';
import {Switch, Route, Link, withRouter, BrowserRouter as Router} from 'react-router-dom';

import React,{useEffect,useState} from 'react';
import SongList from './components/SongList';



import Storage from "@aws-amplify/storage";
import SignIn from './components/SignIn';
import {useHistory} from 'react-router-dom';






Amplify.configure(awsconfig);
Storage.configure(awsconfig);

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    AssessLoggedInState()
  }, [])

  const AssessLoggedInState = ()=>{
    Auth.currentAuthenticatedUser().then( sess =>{
      setloggedIn(true);
    }).catch(()=>{
      setloggedIn(false);
     // history.push('/')
    });
  };




  const signOut = async()=>{
    try{
      await Auth.signOut();      
      setloggedIn(false);
      //history.push('/');
      
    }catch (error){
      console.log("Error signing out ", error)
    }


  };

  const onSignIn = ()=>{
    setloggedIn(true);
  };

  return (
    <Router>
      <div className="App">      
        <header className="App-header"> 
          { loggedIn ? (
          <Button variant='contained' color='primary' onClick={signOut}>
            Sign Out
          </Button>):(
          <Link to ='signin'>
            <Button variant='contained' color='primary'>
              Sign In
            </Button>
          </Link>
          )}         
          <h2>Our Music App</h2>
        </header>
        <Switch>
          <Route exact path="/">
            
          </Route>
          <Route path='/home'>
            <SongList/>
          </Route>
          <Route path='/signin'>
            <SignIn onSignIn={onSignIn}></SignIn>
          </Route>
        </Switch>
        

      </div>
     </Router>
  );
}

export default App;


