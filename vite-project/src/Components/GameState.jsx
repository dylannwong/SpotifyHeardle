import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import App from "../App";


export default function GameState({Id, name}) {
   let [guess, setGuess] = useState(['guess 1:', 'guess 2:', 'guess 3:', 'guess 4:', 'guess 5:', 'guess 6:']);
   
   async function GetTracks() {
      //if too hard to get token, may have to fetch tracks in App then import array from there

   }


   return (
       
      <div>
         <h1 >Guess! from {name}</h1>
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
      
      </div>
   )
   
}