import { Playlist } from "../../../shared/types/Playlist.ts";
import { Link } from "react-router-dom";
import { JSX } from "react";
import { GridShuffleButton } from "./GridShuffleButton.tsx";
import "../styles/playlist-grid.css";

interface PlaylistGridProps {
    playlists: Playlist[];
}

export function PlaylistGrid({ playlists }: PlaylistGridProps): JSX.Element {
    const filteredPlaylists = playlists.filter((playlist: Playlist) => !!playlist.items?.total);

    return (
        <div className="playlist-grid">
            {filteredPlaylists.map((playlist) => (
                <Link
                    key={playlist.id}
                    to={`/playlists/${playlist.id}`}
                    className="playlist-card"
                >
                    <div className="playlist-card__image-container">
                        <img
                            src={playlist.images?.[0]?.url || "/img/spotify-playlist-blank-cover.png"}
                            alt={playlist.name}
                            className="playlist-card__image"
                        />
                        <div className="playlist-card__overlay">
                            <GridShuffleButton
                                playlistId={playlist.id}
                                playlistName={playlist.name}
                            />
                        </div>
                    </div>
                    <p>{playlist.name}</p>
                    <p className="playlist-card__owner">{playlist.owner.display_name}</p>
                </Link>
            ))}
        </div>
    );
}