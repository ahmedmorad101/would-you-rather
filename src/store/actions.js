import * as API from "../data/_users";
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



export function toggleShowUsers(id) {
    return {
        type: types.TOGGLE_SHOW_USERS,
        payload: id
    }
}

function loadUsers(users) {
    return {
        type: types.LOAD_USERS,
        payload: users
    }
}

export const loadUsersAsync = () => (dispatch) => {
    dispatch({ type: types.LOADING_USERS })
    API._getUsers().then(res => dispatch(loadUsers(res)))
}



function loadQuestions(questions) {
    return {
        type: types.LOAD_QUESTIONS,
        payload: questions
    }
}

export const loadQuestionsAsync = () => (dispatch) => {
    dispatch({ type: types.LOADING_QUESTIONS })
    API._getQuestions().then(res => dispatch(loadQuestions(res)))
}

export const answerQuestionAsync = (authedUser, qid, answer) => (dispatch) => {
    dispatch({ type: types.SAVING_ANSWER })
    return API._saveQuestionAnswer({ authedUser, qid, answer })
        .then(res => dispatch({ type: types.ANSWER_SAVED, payload: res }))
}

export const saveQuestionAsync = ({optionOneText, optionTwoText, author}) => (dispatch) => {
    dispatch({ type: types.SAVING_QUESTION })
    return API._saveQuestion({ optionOneText, optionTwoText, author })
        .then(res => dispatch({ type: types.QUESTION_SAVED, payload: res }))
}