import {useLoaderData} from "react-router-dom";
import {redirect} from "react-router";
import {UserProfile} from "../../../shared/types/UserProfile.ts";
import {Playlist, PlaylistItem} from "../../../shared/types/Playlist.ts";
import "../styles/playlist.css";
import {TrackList} from "../components/TrackList.tsx";
import {classicalShuffle} from "../../../shared/utils/shuffle.ts";
import {useState} from "react";

interface ResponseObject {
    profile: UserProfile;
    playlist: Playlist;
}

export async function loader({params}: { params: { playlistId?: string }; }) {
    const playlistId = params.playlistId;
    if (!playlistId) throw new Error('Missing playlist ID');

    const resProfile: Response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/me`, {
            credentials: "include",
        }
    );

    if (resProfile.status === 401) return redirect('/login');

    const resPlaylist: Response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/playlists/${playlistId}`, {
            credentials: "include",
        }
    );

    return {
        profile: await resProfile.json(),
        playlist: await resPlaylist.json(),
    };
}

export function Component() {
    const res: ResponseObject = useLoaderData<ResponseObject>();
    const playlist: Playlist = res.playlist;
    const initialTracks: PlaylistItem[] = playlist.items?.items ?? [];
    const [tracks, setTracks] = useState<PlaylistItem[]>(initialTracks);

    function handleShuffle() {
        setTracks(classicalShuffle(tracks));
    }

    return (
        <main className="playlist-page">
            <header className="playlist-header">
                <img
                    src={
                        playlist.images?.[0]?.url || "/img/spotify-playlist-blank-cover.png"
                    }
                    alt={playlist.name}
                    className="playlist-cover"
                />

                <div className="playlist-meta">
                    <p className="playlist-type">
                        Playlist
                    </p>

                    <h1 className="playlist-name">
                        {playlist.name}
                    </h1>

                    {playlist.description && (
                        <p className="playlist-description">
                            {playlist.description}
                        </p>
                    )}

                    <p className="playlist-owner">
                        {playlist.owner.display_name}
                    </p>

                    <p className="playlist-count">
                        {playlist.items?.total ?? 0}
                        {" "}tracks
                    </p>
                </div>
            </header>

            <section className="playlist-actions">
                <button
                    className="shuffle-button"
                    aria-label="Shuffle playlist"
                    onClick={handleShuffle}
                >
                    ⇄
                </button>
            </section>

            <TrackList tracks={tracks} />
        </main>
    );
}