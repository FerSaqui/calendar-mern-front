export const initialState = {
    status: "checking",
    user: {},
    errorMessage: null
};

export const authenticatedState = {
    status: "authenticated",
    user: {
        uid: "abc",
        name: "Fernando"
    },
    errorMessage: null
};

export const notAuthenticatedState = {
    status: "not-authenticated",
    user: {},
    errorMessage: null
};