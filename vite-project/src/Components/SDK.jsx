export default function SDK({accessToken}) {
<div>
<h1>Spotify Web Playback SDK Quick Start</h1>
    <button id="togglePlay" onClick={player.togglePlay()}>Toggle Play</button>

    <script src="https://sdk.scdn.co/spotify-player.js"></script>
</div>
window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(accessToken); },
      volume: 0.5
    });
 }

 // Ready
 player.addListener('ready', ({ device_id }) => {
  console.log('Ready with Device ID', device_id);
});

// Not Ready
player.addListener('not_ready', ({ device_id }) => {
  console.log('Device ID has gone offline', device_id);
});

player.addListener('initialization_error', ({ message }) => {
  console.error(message);
});

player.addListener('authentication_error', ({ message }) => {
  console.error(message);
});

player.addListener('account_error', ({ message }) => {
  console.error(message);
});

player.connect();
}