import PlaylistView from "./components/PlaylistView";
import TrackPanel from "./components/TrackPanel";

export default function App() {
    return (
        <div className="app">
            <header className="header">
                <h1>QSpot</h1>
                <button>Connect Spotify</button>
            </header>

            <main className="content">
                <PlaylistView />
                <TrackPanel />
            </main>
        </div>
    );
}