import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, Navigate } from "react-router-dom";
import { authSlice } from "../../src/store/auth/authSlice";
import { LoginPage } from "../../src/auth/pages/LoginPage";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import Modal from 'react-modal';
import { AppRouter } from "../../src/Router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("react-modal", () => ({
    ...jest.requireActual("react-modal"),
    setAppElement: () => {},
}));

describe('Pruebas en <AppRouter />', () => {
    const mockCheckAuthToken = jest.fn();

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

    const store = configureStore({
        reducer: {
            auth: authSlice.reducer
        }
    });

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        useAuthStore.mockReturnValue({
            checkAuthToken: mockCheckAuthToken,
            status: "checking"
        });

        render(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(screen.getByText("Cargando...")).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });

    test('Debe de mostrar el login en caso de no estar autenticado', () => {
        
    });
});