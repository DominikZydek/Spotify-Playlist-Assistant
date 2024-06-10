
function AuthButton() {

    function handleAuth() {
        window.location.href = 'http://localhost:3001/login';
    }

    return (
        <button className="bg-spotify-green text-spotify-black font-bold rounded-lg px-10 py-2 mt-5" onClick={() => handleAuth()}>Login with Spotify</button>
    );
}

export default AuthButton;