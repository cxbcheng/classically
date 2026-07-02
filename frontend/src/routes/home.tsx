import {useLoaderData} from "react-router-dom";
import {UserProfile} from "../../../shared/types/UserProfile";
import {Navbar} from "../components/Navbar.tsx";
import {PlaylistGrid} from "../components/PlaylistGrid.tsx";
import {Playlists} from "../../../shared/types/Playlist.ts";
import {fetchPlaylists, fetchProfile} from "../api/fetch.ts";

interface ResponseObject {
    profile: UserProfile;
    playlists: Playlists;
}

export async function loader() {
    const [resProfile, resPlaylists] = await Promise.all([
        fetchProfile(),
        fetchPlaylists()
    ]);

    const profile = await resProfile.json();
    const playlists = await resPlaylists.json();
    return {profile, playlists};
}

export function Component() {
    const res: ResponseObject = useLoaderData<ResponseObject>();

    return (
        <>
            <Navbar profile={res.profile}/>
            <main>
                <PlaylistGrid playlists={res.playlists.items} />
            </main>
        </>
    );
}