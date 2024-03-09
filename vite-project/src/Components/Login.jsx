import React from "react";
import {Container} from 'react-bootstrap';

export default function Login() {
    const handleClick = () => {
        const clientId = "d2167329736c486689194fa6c967d6d1"; 
        const redirectUrl = "http://localhost:5173/"
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "playlist-read-private",
            "playlist-read-collaborative",
            "app-remote-control",
            "streaming",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played"
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    };


    return <Container>
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>;


}