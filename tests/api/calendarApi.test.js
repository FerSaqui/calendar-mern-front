import calendarApi from "../../src/api/calendarApi";

describe('Pruebas en calendarApi', () => {
    test('Debe de tener la configuración por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    test('Debe de tener el x-token en el header de todas las peticiones', async() => {
        const token = "ABC-123-XYZ";
        localStorage.setItem("token", token);
        const response = await calendarApi.post("/auth", {
            email: "fernando@google.com",
            password: "123456"
        });
        // console.log(response);
        expect(response.config.headers['x-token']).toBe(token);
    });
});