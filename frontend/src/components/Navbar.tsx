import {UserProfile} from "../../../shared/types/UserProfile.ts";
import "../styles/navbar.css";

interface NavbarProps {
    profile: UserProfile;
}

export function Navbar({profile}: NavbarProps) {
    const avatarUrl: string = profile?.images[0]?.url;

    return (
        <nav className="navbar">
            <div className="navbar__spacer" />

            <div className="navbar__profile">
                {avatarUrl && (
                    <img
                        src={avatarUrl}
                        alt={profile.display_name}
                        className="navbar__avatar"
                    />
                )}

                <span className="navbar__name">
                    {profile.display_name}
                </span>
            </div>
        </nav>
    );
}