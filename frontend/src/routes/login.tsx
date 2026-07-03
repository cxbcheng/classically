import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Alert } from "../components/Alert";
import { SpotifyButton } from "../components/SpotifyButton";
import "../styles/login.css";

const ERROR_MESSAGES: Record<string, string> = {
    state_mismatch: "We couldn't verify your Spotify login. Please try again.",
    missing_code: "Spotify didn't send the information we needed. Please try again.",
    invalid_token: "Your session is invalid or has expired. Please sign in again.",
    server_error: "Something went wrong on our end. Please try again in a moment.",
};

const DEFAULT_ERROR_MESSAGE = "Something unexpected happened. Please try again.";
function getErrorMessage(code: string | null): string | null {
    if (!code) return null;
    return ERROR_MESSAGES[code] ?? DEFAULT_ERROR_MESSAGE;
}

export function Component() {
    const [searchParams, setSearchParams] = useSearchParams();
    const errorCode = searchParams.get("error");
    const errorMessage = getErrorMessage(errorCode);
    const callback = searchParams.get("callback");
    const reason = searchParams.get("reason"); // Captures 'logout' flag

    const safeCallback = callback && callback.startsWith("/") && !callback.startsWith("//") ? callback : "/";
    const spotifyLoginUrl = `${import.meta.env.VITE_BACKEND_URI}/login?callback=${safeCallback}`;

    useEffect(() => {
        // Only auto-redirect if there is no error code and user didn't explicitly log out
        if (!errorCode && reason !== "logout") {
            window.location.href = spotifyLoginUrl;
        }
    }, [errorCode, reason, spotifyLoginUrl]);

    function handleDismissAlert() {
        const next = new URLSearchParams(searchParams);
        next.delete("error");
        setSearchParams(next, { replace: true });
    }

    if (!errorCode && reason !== "logout") {
        return (
            <main className="login-page">
                <div className="login-page__glow" />
                <section className="login-hero" style={{ opacity: 0.5, transition: "opacity 0.2s" }}>
                    <div className="login-hero__content">
                        <h1 className="login-hero__title">Classically</h1>
                        <p className="login-hero__subtitle" style={{ fontSize: "var(--text-sm)" }}>
                            Connecting to Spotify...
                        </p>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="login-page">
            <div className="login-page__glow" />
            <section className="login-hero">
                <div className="login-hero__content">
                    <p className="login-hero__eyebrow">Classical music served like a cup of coffee.</p>
                    <h1 className="login-hero__title">Classically</h1>
                </div>
                {errorMessage && <Alert message={errorMessage} onDismiss={handleDismissAlert} duration={3000} />}
                <div className="login-hero__actions">
                    <SpotifyButton href={spotifyLoginUrl} className="login-card__cta" aria-describedby="spotify-cta-label" />
                    <p className="login-hero__footnote">Uses the Spotify Web API.</p>
                </div>
            </section>
        </main>
    );
}