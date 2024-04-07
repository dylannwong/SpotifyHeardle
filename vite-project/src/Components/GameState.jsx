import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Card, ProgressBar} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsSearch} from 'react-icons/bs';
import {GoSkipFill} from 'react-icons/go'
import {FaCheckCircle} from 'react-icons/fa'
//import SDK from "./SDK";


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

export default function GameState({Id, name, play_uri, accessToken}) {
   let [guess, setGuess] = useState(['guess 1: ', 'guess 2: ', 'guess 3: ', 'guess 4: ', 'guess 5: ', 'guess 6: ']);
   let [guessCount, setGuessCount] = useState(0)
   
   const [answer, setAnswer] = useState("");
   let [chosenSong, setSong] = useState("");
   let [tracks, setTracks] = useState([]);

   const [is_paused, setPaused] = useState(false);
   let [is_active, setActive] = useState(false);
   const [player, setPlayer] = useState(undefined);
   const [current_track, setTrack] = useState(track);
   let [d_id, setDID] = useState("")
   let [num, setNum] = useState(0)

   
 
   useEffect(() => {
      console.log(play_uri);
      var now = new Date()
      //track.url = 'spotify:track:0rlChpHOc4v3Y0BVCxF6IZ';
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
  
   player.addListener('player_state_changed', ((state)=> {
      console.log('state changed');
      if (!state) {
         return;
      }
      setTrack(state.track_window.current_track);
      setPaused(state.paused);

      player.getCurrentState().then(state => { 
         (!state)? setActive(false) : setActive(true) 
      });

   }));
   

   

   player.connect();
   
      };

   }, []);

   

   async function Submit() {
      //fetches tracks of playlists
      var searchParameters = {
         headers: {
           'Authorization': 'Bearer ' + accessToken
         },
           method: 'GET',
           'Content-Type': 'application/json',
           
         }
      await fetch(`https://api.spotify.com/v1/playlists/${Id}/tracks`, searchParameters)
         .then(response => response.json())
         .then(data => setTracks(tracks = data.items))
      
      setSong(chosenSong = current_track.name);
      console.log(chosenSong);

      console.log(answer);
         //keeps track of guesses and displays them.
         //fix blank answer
      if((answer !== "")|| (answer !== " ")){
      guess[guessCount] = guess[guessCount] + answer;
      setGuessCount(guessCount+1);
      }
      if (answer == chosenSong) {
         console.log("you win!");
      } else {
         console.log("not it");
      }
   }

   const PlayPlaylist = async (uri) => {
      var searchParameters = {
         method: 'PUT',
         body: JSON.stringify({
            context_uri: uri,
         }),
         headers: new Headers({
            'Authorization': 'Bearer ' + accessToken
          }),
       }
         await fetch (`https://api.spotify.com/v1/me/player/play?device_id=${d_id}`, searchParameters).then((data) => console.log(data));
      
         console.log('ID: ' + d_id + ' URI' + play_uri);
      };

      const ShufflePlaylist = async () => {
         var searchParameters = {
            method: 'PUT',
            
            headers: new Headers({
               'Authorization': 'Bearer ' + accessToken
             }),
          }
            
            await fetch (`https://api.spotify.com/v1/me/player/shuffle?state=true&device_id=${d_id}`, searchParameters).then((data) => console.log(data));
            
            console.log('shuff');
         };

   const handle_pause = () => {
      
      setTimeout(function() {

         player.seek(0)
         console.log('Changed position!')
         player.togglePlay()}, 3000);
      
      
      console.log("click");
   }

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
   while(num < 5) {
      ShufflePlaylist();
      PlayPlaylist(play_uri);
      setNum(num = num + 1);
      player.pause();
      }
      
   return (
   
      <div>
         
         <h1>Guess from {name}</h1>
         <div className="fart" style={{display: 'flex', justifyContent: 'center'}}>
         <Row className="mx-6 row row-cols-1">
         <Card>{guess[0]}</Card>
         <Card>{guess[1]}</Card>
         <Card>{guess[2]}</Card>
         <Card>{guess[3]}</Card>
         <Card>{guess[4]}</Card>
         <Card>{guess[5]}</Card>
         </Row>
  
         </div>
         <div>
            <ProgressBar>bar</ProgressBar>
         </div>
            <div className="play" onClick={() => handle_pause()} >
                    { is_paused ? <BsFillPlayCircleFill/> : <BsFillPauseCircleFill/> }
             </div>
        
        <div className="searchb" style={{display: 'flex'}}>
         <FormControl onKeyPress={event => { (event.key=='Enter')? Submit():null }} onChange={event => {setAnswer(event.target.value);}} style={{width: '450px'}}type='text' placeholder=""/>
        </div>
        <div>
         <button className="submit" onClick={Submit}>
            Submit
         </button>
         <button className="skip">
            Skip
         </button>
         </div>
      </div>
   )}
}