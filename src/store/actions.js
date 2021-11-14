import * as types from "./types";

export function login(user) {
    return {
        type: types.LOGIN,
        payload: user
    }
}

export function logout() {
    return {
        type: types.LOGOUT,
    }
}


export function addQuestion(options) {
    return {
        type: types.ADD_QUESTION,
        payload: options
    }
}

export function answerQuestion(id, answer) {
    return {
        type: types.ANSWER_QUESTION,
        payload: { id, answer }
    }
}

export function toggleShowUsers(id) {
    return {
        type: types.TOGGLE_SHOW_USERS,
        payload: id
    }
}

