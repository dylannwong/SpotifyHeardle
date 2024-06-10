import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Card, ProgressBar} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsSearch} from 'react-icons/bs';
import {GoSkipFill} from 'react-icons/go'
import {FaCheckCircle} from 'react-icons/fa'
import App from "../App";
import Win from "./Win";
import Lose from "./Lose";
import SDK from "./SDK";
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

//import SDK from "./SDK";


export default function GameState({songs, track, is_active, is_paused, player, Id, name, play_uri, accessToken}) {
   let [guess, setGuess] = useState(['guess 1: ', 'guess 2: ', 'guess 3: ', 'guess 4: ', 'guess 5: ', 'guess 6: ']);
   let [guessCount, setGuessCount] = useState(0)
   let [skipCount, setSkipCount] = useState(1000)
   const [answer, setAnswer] = useState("");
   let [chosenSong, setSong] = useState("");
   let [gState, setgState] = useState(""); 
   

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
if(gState === 'win'){
   return (<Win/>);
} else if(gState === 'lose'){
   return (<Lose/>);
} else {
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
            <div className="play" >
                    { is_paused ? <BsFillPlayCircleFill onClick={() => handle_play()}/> : <BsFillPauseCircleFill/> }
             </div>
             <div>
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
        id="controllable-states-demo"
        options={songs}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Song" />}
      />
    </div>
  
        <div className="searchb" style={{display: 'flex'}}>
         <FormControl onKeyPress={event => { (event.key=='Enter')? Submit():null }} onChange={event => {setAnswer(event.target.value);}} style={{width: '450px'}}type='text' placeholder=""/>
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
