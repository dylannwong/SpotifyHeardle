import GameState from "./GameState";
import React, { useState, useEffect } from 'react';
export default function Lose({songs, track, is_active, is_paused, player, Id, name, play_uri, accessToken}) {

let [Content, SetContent] = useState('');
const handle_same = () => {
    console.log(Content);
    SetContent(Content='retry');
    player.nextTrack();
    setTimeout(function() {
        
        player.pause();
    Lose
        }, 1000);
}


if(Content=='retry'){
    return(<GameState songs={songs} track={track} is_active={is_active} is_paused={is_paused} player={player} Id={Id} name={name} play_uri={play_uri} accessToken={accessToken}/>)
}
return(
<div className="win">
<h1>You Lose!</h1>
<div className="Winbuttons">
    <button onClick={() => {handle_same()}}>Same Playlist</button>

    <button>New Playlist</button>
</div>

</div>

)

}