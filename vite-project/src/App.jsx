//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect, setState, prevState} from 'react';
import Login from './Components/Login';
import GameState from './Components/GameState';
import SDK from './Components/SDK';
//import SDK from './Components/SDK';

//const CLIENT_ID = "d2167329736c486689194fa6c967d6d1"; 
//const CLIENT_SECRET = "64c50dfd98ad423db5ae935db07006b4";
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

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  let [chosenId, setChosen] = useState("");
  let [chosenName, setChosenName] = useState("");
  let [chosenUri, setURI] = useState("");
  const [playlists, setPlaylist] = useState([]);
  let [isVisible, setIsVisible] = useState(true);
  let [Content, SetContent] = useState('');

  const [player, setPlayer] = useState(undefined);
  let [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [is_paused, setPaused] = useState(false);
  
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1];
        console.log(token);
        setAccessToken(token);
      }


    }, []);

    
    return(
      <>
      { (accessToken === '') ? <Login/> : <SDK accessToken={accessToken} /> }
      </>
    );
    
  }

