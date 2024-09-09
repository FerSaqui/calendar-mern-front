import { createBrowserRouter, Navigate } from "react-router-dom";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { LoginPage } from "../auth/pages/LoginPage";

const privateRoutes = [
    {
        path: "/",
        element: <CalendarPage />
    },
    {
        path: "/*",
        element: <Navigate to={"/"} />
    }
];

const publicRoutes = [
    {
        path: "/auth/*",
        element: <LoginPage />
    },
    {
        path: "*",
        element: <Navigate to={"/auth"}/>
    }
];

export const Routes = () => {
    const authStatus = "authenticated";
    return (authStatus === "authenticated")
            ? createBrowserRouter(privateRoutes)
            : createBrowserRouter(publicRoutes)
}