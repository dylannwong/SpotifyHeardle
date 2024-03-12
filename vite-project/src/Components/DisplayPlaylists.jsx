import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';

export default function DisplayPlaylists() {
const [playlists, setPlaylist] = useState([]);


const handleClick = (name, id) => {
        
    console.log(`${name} clicked`);
    setChosen(chosenId=id)
    
     console.log(chosenId);
    return (<GameState/>);
    
    
  };

{playlists.map((album, i) => {
              
    return (
      
      <Card onClick={() => handleClick(album.name, album.id)}>
        <Card.Img src={album.images[0].url} />
        <Card.Body>
          <Card.Title>{album.name}</Card.Title>
        </Card.Body>
      </Card>
    )
  })}

}