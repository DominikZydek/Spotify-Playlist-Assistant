import { useCookies } from 'react-cookie';
import { useEffect, useState, useContext } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';

import ListItem from '../components/ListItem';

function Dashboard() {

    const [cookies] = useCookies(null);
    const { setSelectedPlaylist, selectedPlaylist } = useContext(PlaylistContext);

    if (!cookies.access_token || !cookies.refresh_token) {
        window.location.href = '/';
    }

    const [userID, setUserID] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    async function getUserID() {
        const response = await fetch('http://localhost:3001/user_id', {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }).then(response => response.json())

        setUserID(response.userID);
    }

    async function getUserPlalists(userID) {
        const response = await fetch(`http://localhost:3001/playlists?userID=${userID}`, {
            headers: {
                'Authorization': 'Bearer ' + cookies.access_token
            }
        }).then(response => response.json())

        setPlaylists(response.playlists);
        console.log(response.playlists);
    }

    useEffect(() => {
        getUserID();
    }, []);

    useEffect(() => {
        if (userID) {
            getUserPlalists(userID);
        }
    }, [userID]);

    function handleListItemClick(playlist) {
        setSelectedPlaylist(playlist);
        window.location.href = '/playlist';
        window.open(playlist.external_urls.spotify, '_blank');
    }

  return (
    <div className="px-10 py-5">
        <h2 className="text-spotify-green font-bold mb-10">Spotify Playlist Assistant</h2>
        <h3 className="text-spotify-green font-bold mb-5">Your Playlists</h3>
        <div className="flex flex-col gap-2">
        {playlists.map(playlist => (
            <ListItem key={playlist.id} playlist={playlist} onClick={() => handleListItemClick(playlist)} />
        ))}
        </div>
        </div>
  );
}

export default Dashboard;