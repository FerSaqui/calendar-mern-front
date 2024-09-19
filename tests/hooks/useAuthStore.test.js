import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store/auth/authSlice";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {
                ...initialState
            }
        }
    });
}

describe('Pruebas en useAuthStore', () => {
    beforeEach(() => localStorage.clear());

    test('Debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore(initialState);
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: null,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        });
    });

    test('startLogin debe de realizar el login correctamente', async() => {
        const mockStore = getMockStore(notAuthenticatedState);
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        await act(async() => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: "authenticated",
            user: {
                name: "fernando",
                uid: "66e4622de04a53630876e3ed"
            }
        });

        expect(localStorage.getItem("token")).toEqual(expect.any(String));
        expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
    });

    test('startLogin debe de fallar la autenticación', async() => {
        const mockStore = getMockStore(notAuthenticatedState);
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        await act(async() => {
            await result.current.startLogin({ email: "algo@google.com", password: "5645566" });
        });

        const { errorMessage, status, user } = result.current;
        expect(localStorage.getItem("token")).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: "not-authenticated",
            user: {}
        });
        
        await waitFor(
            () => expect(result.current.errorMessage).toBe(null)
        );
    });

    test('startRegister debe de crear un usuario', async () => {
        const mockStore = getMockStore(notAuthenticatedState);
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
            data: {
                ok: true,
                uid: "123641234",
                name: "Test user",
                token: "ABC-123"
            }
        });

        await act(async() => {
            await result.current.startRegister({ email: "algo@google.com", password: "5645566", name: "Test user" });
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: "authenticated",
            user: {
                name: "Test user",
                uid: "123641234"
            }
        });

        spy.mockRestore();
    });

    test('startRegister debe fallar la creación', async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        await act(async() => {
            await result.current.startRegister({
                registerEmail: testUserCredentials.email,
                registerName: testUserCredentials.name,
                registerPassword: testUserCredentials.password
            });
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            "errorMessage": "Un usuario existe con ese correo",
            "status": "not-authenticated",
            "user": {},
        });
    });

    test('checkAuthToken debe de fallar si no hay token', async() => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "not-authenticated",
            user: {}
        });
    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async() => {
        const { data } = await calendarApi.post("/auth", testUserCredentials);
        localStorage.setItem("token", data.token);

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: null,
            status: 'authenticated',
            user: { name: 'fernando', uid: '66e4622de04a53630876e3ed' }
        });
    });
});