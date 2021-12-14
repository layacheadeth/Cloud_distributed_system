import logo from './logo.svg';
import './App.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import  { useState, useEffect } from 'react';
import { listSongs } from './graphql/queries';
import  { API, graphqlOperation } from 'aws-amplify';

import React from 'react';
import GraphQLAPI from '@aws-amplify/api-graphql';



Amplify.configure(awsconfig);


function App() {
    const [songs,setSongs]=useState([]);
    useEffect(()=>{
      fetchSongs();
    },[]);
    const fetchSongs=async()=>{
      try{
        const songData=await API.graphql(graphqlOperation(listSongs));
        const songList=songData.data.listSongs.items;
        console.log("song list: ",songList);
        setSongs(songList);

      }
      catch(error){
        console.log("error on fetching songs: ",error);
        
      }
    }


  return (
    <div className="App">
      <header className="App-header">
          <AmplifySignOut />
        <h2>My App Content</h2>
      </header>
      <div className="songList"></div>
    </div>
    
  );
}

export default withAuthenticator(App);
