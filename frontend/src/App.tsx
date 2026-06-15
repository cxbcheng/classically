import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

export default function App() {
    const auth = {
        loading: true,
        authenticated: false,
    };

    if (!auth.authenticated) {}

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        auth.authenticated ? (
                            <Navigate to={"/dashboard"} replace />
                        ) : (
                            <Navigate to={"/login"} replace />
                        )
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}