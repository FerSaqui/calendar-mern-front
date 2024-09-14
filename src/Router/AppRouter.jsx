import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
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

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);
    

    if(status === "checking"){
        return (<h3>Cargando...</h3>);
    }

    const browserRouter = 
        (status === "authenticated")
        ? createBrowserRouter(privateRoutes)
        : createBrowserRouter(publicRoutes);

    return (
        <RouterProvider router={ browserRouter } />
    );
}
