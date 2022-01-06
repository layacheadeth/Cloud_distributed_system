//@ts-check

import React from 'react';


const SongList= () =>{
    return 
    (      <div className="songList"> {songs.map((song, idx) => {
        return (
        <Paper variant="outlined" elevation={2} key={`song${idx}`}>
        <div className="songCard">
           <IconButton aria-label="play" onClick={() => toggleSong(idx)}>
           {songPlaying === idx ? <PauseIcon /> : <PlayArrowIcon /> }
        </IconButton> <div>
        <div className="songTitle">{song.title}</div>
        <div className="songOwner">{song.owner}</div> </div>
        <div>
        <IconButton aria-label="like" onClick={() => addLike(idx)} >
        <FavoriteIcon /> </IconButton> {song.likes}
        </div>
        <div className="songDescription">{song.description}</div> 
        </div>
        {songPlaying === idx ? (
        <div className="ourAudioPlayer"> <ReactPlayer
        url={audioURL}
        controls
        playing
        height="50px"
        onPause={() => toggleSong(idx)}
        /> 
        </div>
        ) : null
        }

        </Paper> );
}
)
} 
{
          
          showAddSong ? <AddSong 
          onUpload={() => {
            setShowAddNewSong(false); 
            fetchSongs();
          }}
          /> : 
          
          <IconButton onClick={() => setShowAddNewSong(true)}> 
            <AddIcon /> 
            </IconButton>
          }
</div>)
}