import { useCookies } from 'react-cookie';

import Tile from '../components/Tile';
import AuthButton from '../components/AuthButton';

function LandingPage() {

    const [cookies] = useCookies(null);

    if (cookies.access_token && cookies.refresh_token) {
        window.location.href = '/dashboard';
    }

  return (
    <div className="grid grid-cols-3 w-screen h-screen">
            <div className="col-span-2 pt-40">
                <h1 className="text-spotify-green text-center font-bold">Welcome to</h1>
                <h1 className="text-spotify-green text-center mb-10 font-bold">Spotify Playlist Assistant</h1>
                <h2 className="text-spotify-green text-center mb-10">Explore the possibilities</h2>
                <div className="flex items-center justify-center gap-8">
                    <Tile title="Sort & Tidy up" description="Sort your playlists in every way possible.<br><br>Remove duplicated songs or songs you haven't listened in ages."/>
                    <Tile title="Combine" description="Combine your playlists into one.<br><br>Create huge playlists with one click of a button."/>
                    <Tile title="Download" description="Download your playlists to your computer and listen locally<br><br>Listen to your favorite tracks offline."/>
                </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <div className="">
                    <h2 className="text-spotify-green text-center font-bold">Get Started</h2>
                    <AuthButton />
                </div>
            </div>
        </div>
  );
}

export default LandingPage;