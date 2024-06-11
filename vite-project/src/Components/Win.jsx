import GameState from "./GameState";
import SDK from "./SDK";
import React, { useState, useEffect } from 'react';
export default function Win({songs, track, is_active, is_paused, player, Id, name, play_uri, accessToken}) {

let [Content, SetContent] = useState('');

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
<div className="win">
<h1>You Win!</h1>
<div className="Winbuttons">
    <button onClick={() => {handle_same()}}>Same Playlist</button>

    <button onClick={() => {handle_diff()}}>New Playlist</button>
</div>

</div>

)

}