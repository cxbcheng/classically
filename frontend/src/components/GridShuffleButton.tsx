import { MouseEvent } from "react";
import { useQuickShuffle } from "../hooks/useQuickShuffle";
import "../styles/playlist-button.css";

interface GridShuffleButtonProps {
    playlistId: string;
    playlistName: string;
}

export function GridShuffleButton({ playlistId, playlistName }: GridShuffleButtonProps) {
    const { handlePreviewShuffle } = useQuickShuffle();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handlePreviewShuffle(playlistId);
    };

    return (
        <button
            className="playlist-button playlist-button--shuffle playlist-card__action"
            onClick={onClick}
            aria-label={`Preview shuffle for ${playlistName}`}
            title="Quick Shuffle"
        >
            <img
                src="/img/shuffle.png"
                alt="Shuffle playlist"
                className="playlist-button__icon"/>
        </button>
    );
}