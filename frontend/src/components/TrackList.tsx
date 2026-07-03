import { PlaylistItem } from "../../../shared/types/Playlist.ts";
import "../styles/track-list.css";
import { JSX, useRef, useState, KeyboardEvent } from "react";
import { TrackPlayButton } from "./TrackPlayButton.tsx";

interface TrackListProps {
    tracks: PlaylistItem[];
    handlePlayFromPosition: (index: number, e: any) => void;
}

export function TrackList({ tracks, handlePlayFromPosition }: TrackListProps): JSX.Element {
    // Array of refs to directly target the DOM elements for focus management
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Track which row is currently in the tabbing sequence
    const [focusedIndex, setFocusedIndex] = useState(0);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
        let nextIndex = index;

        if (e.key === "ArrowDown") {
            e.preventDefault(); // Prevents page from scrolling down
            nextIndex = Math.min(index + 1, tracks.length - 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault(); // Prevents page from scrolling up
            nextIndex = Math.max(index - 1, 0);
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePlayFromPosition(index, e);
        }

        // Shift focus if an arrow key was pressed
        if (nextIndex !== index) {
            rowRefs.current[nextIndex]?.focus();
        }
    };

    return (
        <section className="track-list" role="list" aria-label="Track list">
            <div className="track-list__header">
                <span>#</span>
                <span>Title</span>
                <span>Artist</span>
            </div>

            {tracks.map((playlistItem: PlaylistItem, index: number) => {
                const track = playlistItem.item;

                const handleRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
                    if (window.matchMedia('(max-width: 768px)').matches) {
                        handlePlayFromPosition(index, e);
                    }
                };

                return (
                    <div
                        key={track.id}
                        className="track-row"
                        role="listitem"
                        tabIndex={focusedIndex === index ? 0 : -1}
                        ref={(el) => { rowRefs.current[index] = el; }}
                        onFocus={() => setFocusedIndex(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onClick={handleRowClick}
                    >
                        <span className="track-number-cell">
                            <span className="track-index">{index + 1}</span>
                            <TrackPlayButton
                                isPlaying={false}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayFromPosition(index, e);
                                }}
                            />
                        </span>

                        <div className="track-title">
                            {track.album.images?.[0] && (
                                <img
                                    src={track.album.images[0].url}
                                    alt={track.album.name}
                                    className="track-cover"
                                />
                            )}

                            <div>
                                <div className="track-name">{track.name}</div>
                            </div>
                        </div>

                        <div className="track-artists">
                            {track.artists.map((artist) => artist.name).join(", ")}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}