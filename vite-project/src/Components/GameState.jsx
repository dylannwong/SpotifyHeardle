import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsSearch} from 'react-icons/bs';
import {GoSkipFill} from 'react-icons/go'
import {FaCheckCircle} from 'react-icons/fa'


export default function GameState({Id, name, accessToken}) {
   let [guess, setGuess] = useState(['guess 1:', 'guess 2:', 'guess 3:', 'guess 4:', 'guess 5:', 'guess 6:']);
   let [play, setPlay] = useState(true);
   const [answer, setAnswer] = useState("");
   const [chosenSong, setSong] = useState("vibe");
   let [tracks, setTracks] = useState([]);

   async function GetTracks() {
      //if too hard to get token, may have to fetch tracks in App then import array from there

   }
   const handlePlay = () => {
     setPlay(false);
   }

   async function PlaySong() {

   }




   const handlePause = () => {
      setPlay(true);
   }

   async function Submit() {
      
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

      console.log(tracks[0].track.name);
      setSong(tracks[0].track.name)

      console.log(answer);
      if (answer == chosenSong) {
         console.log("you win!");
      } else {
         console.log("not it");
      }
   }

   return (
       
      <div>
         <h1 >Guess from {name}</h1>
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
         <div className="play" >
        {play? <BsFillPlayCircleFill onClick={() => handlePlay()}/> : <BsFillPauseCircleFill onClick={() => handlePause()}/>}
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
   )
   
}