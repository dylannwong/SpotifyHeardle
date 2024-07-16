import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Card, ProgressBar} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsSearch} from 'react-icons/bs';
import Win from "./Win";
import Lose from "./Lose";
import 'react-autocomplete-input/dist/bundle.css';
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

//import SDK from "./SDK";


export default function GameState({cont, songs, track, is_active, is_paused, player, Id, name, play_uri, accessToken}) {
   let [guess, setGuess] = useState(['guess 1: ', 'guess 2: ', 'guess 3: ', 'guess 4: ', 'guess 5: ', 'guess 6: ']);
   let [guessCount, setGuessCount] = useState(0)
   let [skipCount, setSkipCount] = useState(1000)
   const [answer, setAnswer] = useState("");
   let [chosenSong, setSong] = useState("");
   let [gState, setgState] = useState(""); 
   let [chosen_uri, Seturi] = useState('');

   const [value, setValue] = useState(songs[0]);
   const [inputValue, setInputValue] = useState('');
   
   useEffect(() => {
      console.log(play_uri);
   }, []);

   
   async function Submit() {
      //fetches tracks of playlists

      setSong(chosenSong = track.name);
      console.log(chosenSong);
      
      console.log(songs);
      console.log(answer);
         //keeps track of guesses and displays them.
         //fix blank answer
      if((answer !== "")|| (answer !== " ")){
      guess[guessCount] = guess[guessCount] + answer;
      setGuessCount(guessCount+1);
      }

      if(guessCount >= 5 && answer != chosenSong){
         gState = setgState("lose");
      } else if(answer == chosenSong) {
         player.pause();
         gState = setgState("win");
         console.log("you win!");
      } else {
         console.log("not it");
         console.log("guess #" + guessCount);
      }
   
   }

   const Skip = () => {
      console.log('skip')
      if(skipCount == 16000){
         gState = setgState("lose");
      }
      guess[guessCount] = guess[guessCount] + 'SKIP';
      setGuessCount(guessCount+1);
      if(skipCount == 1000){
         setSkipCount(2000);
      } else if(skipCount == 2000){
         setSkipCount(4000);
      } else if(skipCount == 4000){
         setSkipCount(7000);
      } else if(skipCount == 7000){
         setSkipCount(11000);
      } else if(skipCount == 11000){
         setSkipCount(16000);
      }
   };

         const handle_play = () => {
            player.togglePlay();
            setTimeout(function() {
               
               player.seek(0);
               player.pause();
      
               }, skipCount);
            
            console.log("click");
         }
      
         const handle_pause = () => {
            player.togglePlay();
            player.seek(0);
         }

         player.getCurrentState().then(state => {
            if (!state) {
              console.error('User is not playing music through the Web Playback SDK');
              return;
            }
          
            var current_track = state.track_window.current_track;
            var next_track = state.track_window.next_tracks[0];
            Seturi(chosen_uri=current_track.uri);
            
            
          });

   if (!is_active) { 
      return (
          <>
              <div className="container">
                  <div className="inactive">
                      <b> Instance not active. Transfer your playback using your Spotify app </b>
                  </div>
              </div>
          </>)
  }
if(gState === 'win'  && cont != 'game'){
   return (<Win guessCount={guessCount} chosen_uri={chosen_uri} songs={songs} track={track} is_active={is_active} is_paused={is_paused} player={player} Id={Id} name={name} play_uri={play_uri} accessToken={accessToken}/>);
} else if(gState === 'lose' && cont != 'game'){
   return (<Lose chosen_uri={chosen_uri} songs={songs} track={track} is_active={is_active} is_paused={is_paused} player={player} Id={Id} name={name} play_uri={play_uri} accessToken={accessToken}/>);
} else {
   return (
   
      <div className="gamer">
         
         <h1>Guess from {name}</h1>
         <div className="f">
         <Row style={{display: "flex"}}>
         <Card>{guess[0]}</Card>
         <Card>{guess[1]}</Card>
         <Card>{guess[2]}</Card>
         <Card>{guess[3]}</Card>
         <Card>{guess[4]}</Card>
         <Card>{guess[5]}</Card>
         </Row>

         </div>
            <div className="play" >
                    { is_paused ? <BsFillPlayCircleFill onClick={() => handle_play()}/> : <BsFillPauseCircleFill/> }
             </div>
            
  
        <div className="s" style={{display: 'relative'}}>
        <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setAnswer(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setAnswer(newInputValue);
         }}
        options={songs}
        sx={{ width: 450 }}
        renderInput={(params) => <TextField {...params} label="Song" />}
      />
        </div>
        <div>
         <button className="submit" onClick={Submit}>
            Submit
         </button>
         <button className="skip" onClick={() => Skip()}>
            Skip
         </button>
         </div>
      </div>
   )}


}
