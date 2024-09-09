import { RouterProvider } from "react-router-dom"
import { Routes } from "./Routes";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const AppRouter = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={ Routes() } />
        </Provider>
    );
}
