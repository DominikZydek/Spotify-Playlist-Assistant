import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Playlist from './pages/Playlist';
import { PlaylistProvider } from './context/PlaylistContext';


function App() {

    const [cookies] = useCookies(null);

    return (
        <PlaylistProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/playlist" element={<Playlist />} />
                </Routes>
            </Router>
        </PlaylistProvider>
    );
}

export default App;