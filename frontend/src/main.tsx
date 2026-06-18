import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes.ts";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);