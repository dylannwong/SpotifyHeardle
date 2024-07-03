import GameState from "./GameState";
import SDK from "./SDK";
import React, { useState, useEffect } from 'react';
import { Spotify } from "react-spotify-embed";
import {Container} from 'react-bootstrap';
export default function Win({guessCount, chosen_uri, songs, track, is_active, is_paused, player, Id, name, play_uri, accessToken}) {

let [Content, SetContent] = useState('');
let [uri, Seturi] = useState('');


useEffect(() => {
    Seturi(uri=chosen_uri);
    Seturi(uri=uri.substring(14));

    console.log(uri);
}, [])
const handle_same = () => {
    console.log(Content);
    SetContent(Content='retry');
    player.nextTrack();
    setTimeout(function() {
        
        player.pause();
    
        }, 1000);
}

const handle_diff = () => {
    console.log(Content);
    SetContent(Content='diff');
}

if(Content=='retry'){
    return(<GameState songs={songs} track={track} is_active={is_active} is_paused={is_paused} player={player} Id={Id} name={name} play_uri={play_uri} accessToken={accessToken}/>);
} else if (Content=='diff') {
    return(<SDK accessToken={accessToken}/>);
}
return(
<div>
<h1>You Win!</h1>

<div >
<Container>
    <button className="playagain"  onClick={() => {handle_same()}}>
        Play Again
        </button>
</Container>

<div className="spot">

<Spotify wide link= {`https://open.spotify.com/track/${uri}`}/>

</div>

</div>
<div className="Winmsg">Nice Work! You got it in {guessCount} guess(es)!
</div>


</div>

)

}