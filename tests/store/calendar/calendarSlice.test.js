import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarInitialState, calendarWithActiveEventState, calendarWithEventsState, events } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {
    test('Debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(calendarInitialState);
    });

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: "3",
            title: "nuevo evento",
            start: new Date("2022-12-21 13:00:00"),
            end: new Date("2022-12-21 15:00:00"),
            notes: "Pruebas notas",
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([ ...events, newEvent ]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => {
        const updatedEvent = {
            id: "1",
            title: "nuevo evento actualizado",
            start: new Date("2022-12-21 13:00:00"),
            end: new Date("2022-12-21 15:00:00"),
            notes: "Pruebas notas actualizado",
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);
    });

    test('onDeleteEvent debe de borrar el evento activo', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        console.log(state);
        expect(state.events).not.toContain({
            ...events[0]
        });

        expect(state.activeEvent).toBe(null);
    });

    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer(calendarInitialState, onLoadEvents(events));
        expect(state).toEqual(calendarWithEventsState);
    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());
        expect(state).toEqual(calendarInitialState);
    });
});