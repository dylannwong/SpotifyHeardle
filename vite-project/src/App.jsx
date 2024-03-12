//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import Login from './Components/Login';
import GameState from './Components/GameState.jsx';
import DisplayPlaylists from './Components/DisplayPlaylists.jsx'
import { start } from './Components/Start.jsx';

//const CLIENT_ID = "d2167329736c486689194fa6c967d6d1"; 
//const CLIENT_SECRET = "64c50dfd98ad423db5ae935db07006b4";


export default function App() {
  const [accessToken, setAccessToken] = useState("");
  let [chosenId, setChosen] = useState("");
  const [playlists, setPlaylist] = useState([]);
  let [isVisible, setIsVisible] = useState(true);
  let [Content, SetContent] = useState('playlist');
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1];
        console.log(token);
        setAccessToken(token);
      }

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
      
  
      //await fetch('https://api.spotify.com/v1/users/tylerhalili29/playlists', searchParameters)
      await fetch('https://api.spotify.com/v1/me/playlists', searchParameters)
        .then(response => response.json())
        .then(data => { setPlaylist(data.items);
        })
        //.then(data => { return data.artist.items[0].id })
  
    }
    const handleClick = (name, id) => {
    
      console.log(`${name} clicked`);
      setChosen(chosenId=id)
      
       console.log(chosenId);
       SetContent(Content='Game');
      
      
    };
      
    return (
      <div className= "App" >
      
       <Container>
          
          {accessToken ? isVisible && (<Button onClick={start}>Pick From Playlsits</Button>) :< Login />}
          
          
        <Container>
        {(Content==='playlist'&&(!isVisible)) ? <Card>Set Playlist</Card>:null }
          <Row className="mx-2 row row-cols-6">
         
        {Content==='playlist'? 
        
        playlists.map((album, i) => {
              
              return (
                
                <Card className='chover' onClick={() => handleClick(album.name, album.id)} >
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
              )
            }): <GameState/> }
          
          </Row>
          
        </Container>
       </Container>
    </div>

  );
}