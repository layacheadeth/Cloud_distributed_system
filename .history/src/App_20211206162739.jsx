import logo from './logo.svg';
import './App.css';

import { IconButton, Paper } from '@material-ui/core';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import  { useState, useEffect } from 'react';
import { listSongs } from './graphql/queries';
import  { API, graphqlOperation } from 'aws-amplify';

import React from 'react';
import GraphQLAPI from '@aws-amplify/api-graphql';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';



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
      <div className="songList">
        {
          songs.map(song=>{
            <Paper variant="outlined" elevation={2}>
                <div className="songCard">
                  <IconButton aria-label="play">
                    <PlayArrowIcon/> 
                  </IconButton>
                </div>
            </Paper>
          })
        }
      </div>
    </div>
    
  );
}

export default withAuthenticator(App);
