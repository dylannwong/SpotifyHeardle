import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import GameState from './GameState';
const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

export default function SDK({accessToken}) {

  let [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  let [isVisible, setIsVisible] = useState(true);
  let [Content, SetContent] = useState('playlist');
  let [chosenId, setChosen] = useState("");
  let [chosenName, setChosenName] = useState("");
  let [chosenUri, setURI] = useState("");
  const [playlists, setPlaylist] = useState([]);
  let [d_id, setDID] = useState("");
  let [tracks, setTracks] = useState([]);
  let [songs, setSongs] = useState(['hi', 'him ', 'hi']);
  
  useEffect(() => {
    var now = new Date()
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new Spotify.Player({
        name: `SDK @${now.getHours()}:${now.getMinutes()}`,
        getOAuthToken: cb => { cb(accessToken); },
        volume: 0.5
      });

    setPlayer(player);


 // Ready
 player.addListener('ready', ({ device_id }) => {
  console.log('Ready with Device ID', device_id);
  setDID(device_id);
});

// Not Ready
player.addListener('not_ready', ({ device_id }) => {
  console.log('Device ID has gone offline', device_id);
});
player.addListener('player_state_changed', ( state => {

  if (!state) {
      return;
  }
  setTrack(state.track_window.current_track);
  setPaused(is_paused=state.paused);

  player.getCurrentState().then( state => { 
      (!state)? setActive(false) : setActive(true) 
  });

}));

player.connect();

};
}, []);



async function start() {
  setIsVisible(false);
  console.log("Getting Playlists ");
  // Get request using search to get the Artist ID
  var searchParameters = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
      method: 'GET',
      'Content-Type': 'application/json',
      
    }

    


    //await fetch (`https://api.spotify.com/v1/me/player/shuffle?state=true`, sParameters).then((data) => console.log(data))



  //await fetch('https://api.spotify.com/v1/users/tylerhalili29/playlists', searchParameters)
  await fetch('https://api.spotify.com/v1/me/playlists', searchParameters)
    .then(response => response.json())
    .then(data => { setPlaylist(data.items);})
    //.then(data => { return data.artist.items[0].id })

}

function gTrack(item) {
  return item.track.name;
}

const handleClick = async (name, id, uri) => {

  console.log(`${name} clicked`);
  setURI(chosenUri=uri);
  setChosen(chosenId=id);
  setChosenName(chosenName=name)

  var searchParameters = {
    method: 'PUT',
    body: JSON.stringify({
       context_uri: chosenUri,
    }),
    headers: new Headers({
       'Authorization': 'Bearer ' + accessToken
     }),
  }

  var sParameters = {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
      method: 'GET',
      'Content-Type': 'application/json',
      
    }

 await fetch(`https://api.spotify.com/v1/playlists/${chosenId}/tracks`, sParameters)
    .then(response => response.json())
    .then(data => setTracks(tracks = data.items))

  await fetch(`https://api.spotify.com/v1/playlists/${chosenId}/tracks?offset=100`, sParameters)
    .then(response => response.json())
    .then(data => setTracks(tracks = tracks.concat(data.items)))

  await fetch(`https://api.spotify.com/v1/playlists/${chosenId}/tracks?offset=200`, sParameters)
    .then(response => response.json())
    .then(data => setTracks(tracks = tracks.concat(data.items)))

  await fetch(`https://api.spotify.com/v1/playlists/${chosenId}/tracks?offset=300`, sParameters)
    .then(response => response.json())
    .then(data => setTracks(tracks = tracks.concat(data.items)))


  console.log(tracks);
  setSongs(songs = tracks.map(gTrack));
  
  await fetch (`https://api.spotify.com/v1/me/player/shuffle?state=true&device_id=${d_id}`, searchParameters).then((data) => console.log(data));

  await fetch (`https://api.spotify.com/v1/me/player/play?device_id=${d_id}`, searchParameters).then((data) => console.log(data))
  setTimeout(function() {
               
    player.seek(0);
    player.pause();

    }, 500);
  console.log(chosenId);
  SetContent(Content='Game');
};








if (!is_active) { 
return (
<>
  <div className="container">
      <div className="inactive">
          <b> Instance not active. Transfer your playback using your Spotify app </b>
      </div>
  </div>
</>)
} else {
  return (
    <div className= "App" >
    
     <Container>
        
        {accessToken ? isVisible && (<Button onClick={start}>Pick From Playlists</Button>) :< Login />}
        
        
      <Container>
      {(Content==='playlist'&&(!isVisible)) ? <Card>Set Playlist</Card>:null }
        <Row className="mx-2 row row-cols-6">
       
      {Content==='playlist'? 
      
      playlists.map((album, i) => {
            
            return (
              
              <Card className='chover' onClick={() => handleClick(album.name, album.id, album.uri)} >
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            )
          }): <GameState songs={songs} track={current_track} is_active={is_active} is_paused={is_paused} player={player} Id={chosenId} name={chosenName} play_uri={chosenUri} accessToken={accessToken}/> } 
          
        
        </Row>
        
      </Container>
     </Container>
  </div>

);


}}