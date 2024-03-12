import React from "react"

export async function start() {
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