import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import Login from './Components/Login';

//const CLIENT_ID = "d2167329736c486689194fa6c967d6d1"; 
//const CLIENT_SECRET = "64c50dfd98ad423db5ae935db07006b4";


export default function App() {
  const [accessToken, setAccessToken] = useState("");
  let [chosenId, setChosen] = useState("");
  const [playlists, setPlaylist] = useState([]);
  
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1];
        console.log(token);
        setAccessToken(token);
      }

    }, []);

    async function search() {
      console.log("Search for ");
      // Get request using search to get the Artist ID
      var searchParameters = {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
          method: 'GET',
          'Content-Type': 'application/json',
          
        }
      
  
      //await fetch('https://api.spotify.com/v1/users/tylerhalili29/playlists', searchParameters)
      await fetch('https://api.spotify.com/v1/me/playlists', searchParameters)
        .then(response => response.json())
        .then(data => { setPlaylist(data.items);
        })
        //.then(data => { return data.artist.items[0].id })
    }

      const handleClick = (id) => {
        
        console.log(`${id} clicked`);
        setChosen(chosenId=id)
        
         console.log(chosenId);
        
        
      };
    return (
      <div className="App">
      
       <Container>
       
        <InputGroup className="mb-4" size="lg">
        
          <Button onClick={search}>
            Start
          </Button>
          <button>< Login /></button>
        </InputGroup>
        <Container>
          <Row className="mx-2 row row-cols-6">
            {playlists.map((album, i) => {
              
              return (
                <Card onClick={() => handleClick(album.name)}>
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
              )
            })}
          
          </Row>
          
        </Container>
       </Container>
    </div>

  );
}