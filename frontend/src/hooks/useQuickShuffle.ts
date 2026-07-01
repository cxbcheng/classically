import { useNavigate } from "react-router-dom";

export function useQuickShuffle() {
    const navigate = useNavigate();

    const handlePreviewShuffle = (playlistId: string) => {
        navigate(`/playlists/${playlistId}`, { state: { quickShuffle: true } });
    };

    return { handlePreviewShuffle };
}