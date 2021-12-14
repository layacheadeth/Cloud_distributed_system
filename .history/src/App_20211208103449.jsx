import logo from './logo.svg';
import './App.css';

import { IconButton, Paper, TextField } from '@material-ui/core';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import  { useState, useEffect } from 'react';
import { listSongs } from './graphql/queries';
import  { API, graphqlOperation, Storage } from 'aws-amplify';

import React from 'react';
import GraphQLAPI from '@aws-amplify/api-graphql';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';

import { updateSong } from './graphql/mutations';
import ReactPlayer from 'react-player';


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

    const [songPlaying,setSongPlaying]=useState('');
    const [audioURL,setAudioURL]=useState('');
    const [showAddSong, setShowAddNewSong]= useState(false);

    const toggleSong=async idx=> {
      if(songPlaying===idx){
        setSongPlaying('');
        return 
      }

      const songFilepath=songs[idx].filePath;
      try{
        const fileAccessUrl=await Storage.get(songFilepath,{expire:60});
        console.log('Access URL: ',fileAccessUrl);
        setSongPlaying(idx);
        setAudioURL(fileAccessUrl);
        return;
      }
      catch(error){
        console.error('error accessing the file from s3',error);
        setAudioURL('');
        setSongPlaying('');

      }


      
    }

    const addLike=async (idx)=>{
      try{
        const song=songs[idx];
        song.likes=song.likes+1;
        delete song.createdAt;
        delete song.updatedAt;

        const songData=await API.graphql(graphqlOperation(updateSong,{input:song}));
        const songList=[...songs];
        songList[idx]=songData.data.updateSong;
        setSongs(songList);

      }catch(error){
        console.log("Error on adding like to song: ",error);
      }
    }


  return (
    <div className="App">
      <header className="App-header">
          <AmplifySignOut />
        <h2>My App Content</h2>
      </header>

      <div className="songList">
    {songs.map((song, idx) => {
        return (
            <Paper variant="outlined" elevation={2} key={`song${idx}`}>
                <div className="songCard">
                    <IconButton aria-label="play" onClick={()=>toggleSong(idx)}>
                        {songPlaying===idx?<PauseIcon/>:<PlayArrowIcon/>}
                        
                    </IconButton>
                    <div>
                        <div className="songTitle">{song.title}</div>
                        <div className="songOwner">{song.owner}</div>
                    </div>
                    <div>
                        <IconButton aria-label="like" onClick={()=>addLike(idx)}>
                            <FavoriteIcon />
                        </IconButton>
                        {song.likes}
                    </div>
                    <div className="songDescription">{song.description}</div>
                </div>
                {
                  songPlaying === idx?(
                    <div className="ourAudioPlayer">
                      <ReactPlayer 
                      url={audioURL}
                      controls
                      playing
                      height="50px"
                      onPause={()=>toggleSong(idx)}
                      
                      />
                    </div>
                  ) : null
                }
            </Paper>
        );
    })}
    {
      showAddSong?(
        <AddSong/>

      ):<IconButton><AddIcon /></IconButton>
    }
</div>
      
    </div>
    
  );
}

export default withAuthenticator(App);

const AddSong= ()=>{
  return (
    <div className="newSong">
      <TextField label="title" />
      <TextField label="artist" />
      <TextField label="description" />
    </div>
    
    

  )
}