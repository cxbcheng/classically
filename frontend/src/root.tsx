import {isRouteErrorResponse, Outlet, useRouteError} from "react-router-dom";

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="centered">
                <h1>{error.status}</h1>
                <p>{error.statusText}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Oops, something went wrong.</h1>
            <p>An unexpected error occurred.</p>
        </div>
    );
}

export default function Root() {
    return <Outlet />;
}