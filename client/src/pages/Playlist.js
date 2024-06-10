import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

function Playlist() {

  const { selectedPlaylist } = useContext(PlaylistContext);

  console.log(selectedPlaylist);

  return (
    <div className="px-10 py-5">
      <h2 className="text-spotify-green font-bold mb-10">Spotify Playlist Assistant</h2>
      <div className="flex items-center gap-5">
        <img className="w-20 h-20" src={selectedPlaylist.images[0].url} alt={selectedPlaylist.name} />
        <div>
          <h3 className="text-spotify-green font-bold">{selectedPlaylist.name}</h3>
          <h4 className="text-spotify-green font-bold">by {selectedPlaylist.owner.display_name}</h4>
        </div>
      </div>
      <h3 className="text-spotify-green font-bold">Number of tracks: {selectedPlaylist.tracks.total}</h3>
      <h3 className="text-spotify-green"><a href={selectedPlaylist.external_urls.spotify} target="_blank">See in spotify</a></h3>
    </div>
  );
}

export default Playlist;