export const events = [
    {
        id: "1",
        title: "Cumpleaños mío",
        start: new Date("2022-10-21 13:00:00"),
        end: new Date("2022-10-21 15:00:00"),
        notes: "Comprar pastel",
    },
    {
        id: "2",
        title: "Cumpleaños Fer",
        start: new Date("2022-11-21 13:00:00"),
        end: new Date("2022-11-21 15:00:00"),
        notes: "Comprar pastel para Fer",
    }
];

export const calendarInitialState = {
    events: [],
    isLoadingEvents: true,
    activeEvent: null
}

export const calendarWithEventsState = {
    events: [...events],
    isLoadingEvents: false,
    activeEvent: null
}

export const calendarWithActiveEventState = {
    events: [...events],
    isLoadingEvents: false,
    activeEvent: {
        ...events[0]
    }
}