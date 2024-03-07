import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect} from 'react';
import Login from './Components/Login';

//const CLIENT_ID = "d2167329736c486689194fa6c967d6d1"; 
//const CLIENT_SECRET = "64c50dfd98ad423db5ae935db07006b4";


export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [chosenId, setChosen] = useState("");
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
        .then(data => { console.log(data);
        setPlaylist(data.items);
        })
        //.then(data => { return data.artist.items[0].id })
    }
      const handleClick = (title) => {
        setChosen(title);
        console.log(`${chosenId} clicked`);
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
              console.log(album);
              return (
                <Card title={album.name} onClick={handleClick}>
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
  /*const [accessToken, setAccessToken] = useState("");

  const [randoTrack, setRand] = useState("")

  const [playlists, setPlaylist] = useState([]);
  
  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])


  

  

  // Search 
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
      .then(data => { console.log(data);
      setPlaylist(data.items);
      })
      //.then(data => { return data.artist.items[0].id })
  }

  
  
  async function pickRandom(id, total) {

    const x = Math.floor(Math.random() * total);

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    
    //var track = await fetch('https://api.spotify.com/v1/playlists/47UC5GnL3552uIHMO4eOtM/tracks' , searchParameters)
    var track = await fetch('https://api.spotify.com/v1/playlists/' + id + "/tracks", searchParameters)
      .then(response => response.json())
      .then(data => {setRand(data.items[0].track.name);})
    
  }

  
  //pickRandom("47UC5GnL3552uIHMO4eOtM",15);
  //console.log(randoTrack);

  return (
    <div className="App">
      
       <Container>
        <InputGroup className="mb-4" size="lg">
          <Button onClick={search}>
            Start
          </Button>
        </InputGroup>
        <Container>
          <Row className="mx-2 row row-cols-6">
            {playlists.map( (album, i) => {
              //console.log(album);
              return (
                <Card>
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

export default App;
*/
}