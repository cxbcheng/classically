import {redirect} from "react-router";
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
    const resProfile: Response = await fetchProfile();

    if (resProfile.status === 401) {
        throw redirect('/login');
    } else if (resProfile.status === 403) {
        throw redirect('/error');
    } else {
        console.log(resProfile.status);
    }

    const resPlaylists: Response = await fetchPlaylists();
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