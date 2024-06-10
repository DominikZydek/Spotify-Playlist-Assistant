const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());

app.get('/login', (req, res) => {
    const scope = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI
        })
    );
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    if (code === null) {
        res.redirect('/#' +
            new URLSearchParams({
                error: 'invalid_code'
            })
        );
    } else {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI
            })
        }).then(response => response.json());

        res.cookie('access_token', response.access_token);
        res.cookie('refresh_token', response.refresh_token);

        res.redirect('http://localhost:3000');
    }
});

app.get('/user_id', async (req, res) => {
    const access_token = req.headers.authorization.split(' ')[1];

    const result = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }).then(response => response.json());

    const userID = result.id;

    res.json({ userID: userID });
});

app.get('/playlists', async (req, res) => {
    const access_token = req.headers.authorization.split(' ')[1];
    const userID = req.query.userID;

    const result = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }).then(response => response.json());

    if (result.total > 50) {
        let offset = 50;

        while (result.total > offset) {
            const nextResult = await fetch('https://api.spotify.com/v1/me/playlists?limit=50&offset=' + offset, {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }).then(response => response.json());

            result.items = result.items.concat(nextResult.items);

            offset += 50;
        }
    }

    let playlists = result.items;
    console.log(playlists.length);

    playlists = playlists.filter(playlist => playlist.owner.id === userID);
    console.log(playlists.length);

    res.json({ playlists: playlists });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});