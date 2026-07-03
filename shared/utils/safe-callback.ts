import { Location } from "react-router-dom";

export function getSafeCallbackString(location: Location | URL | string): string {
    let path = "/";

    if (typeof location === "string") {
        path = location;
    } else if (location instanceof URL) {
        path = location.pathname + location.search + location.hash;
    } else if (location && "pathname" in location) {
        path = location.pathname + (location.search ?? "") + (location.hash ?? "");
    }

    return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

// Returns the login url with a callback path pointing to the current location.
export function getLoginUrl(location: Location | URL | string) {
    return `/login?callback=${encodeURIComponent(getSafeCallbackString(location))}`;
}