import React from "react";
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

export default function DisplayPlaylists() {
    playlists.map((album, i) => {
              
    return (
      <Card onClick={() => handleClick(album.name)}>
        <Card.Img src={album.images[0].url} />
        <Card.Body>
          <Card.Title>{album.name}</Card.Title>
        </Card.Body>
      </Card>
    )
  })
}
