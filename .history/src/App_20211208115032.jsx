import logo from './logo.svg';
import './App.css';

import { IconButton, Paper, TextField } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

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
import PublishIcon from '@material-ui/icons/Publish';


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
        <AddSong onUpload={()=>{
          setShowAddNewSong(false)
          fetchSongs()
        }}/>

      ):<IconButton onClick={()=>setShowAddNewSong(true)}>

        <AddIcon />
        </IconButton>
    }
</div>
      
    </div>
    
  );
}

export default withAuthenticator(App);

const AddSong= ({onUpload })=>{
  const [songData, setSongData] = useState({});
  const [mp3Data, setMp3Data] = useState();


  const uploadSong= async ()=>{
    console.log('SongData: ',songData);

    const { title, description, owner } = songData;
    
    const { key }= await Storage.put(`${uuid()}.mp3`,mp3Data,{contentType:'audio/mp3'});

    const createSongInput = {
      id:uuid(),
      title,
      description,
      filePath:key,
      owner,

    }
    
    onUpload(); 
  }

  return (
    <div className="newSong">
      <TextField label="title" 
      value={songData.title} 
      onChange={e=> setSongData({...songData,title:e.target.value})} />

      <TextField label="artist" 
      value={songData.owner} 
      onChange={e=> setSongData({...songData,owner:e.target.value})} 
      />

      <TextField label="description" 
      value={songData.description} 
      onChange={e=> setSongData({...songData,description:e.target.value})}
      />


      <input type="file" accept="audio/mp3" onChange={e => setMp3Data(e.target.files[0])} />

      <IconButton onClick={uploadSong}>
        <PublishIcon />
      </IconButton>
    </div>
    
    

  );
};