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

export const loadQuestionsAsync = () => async (dispatch) => {
    dispatch({ type: types.LOADING_QUESTIONS })
    const res = await API._getQuestions()
    dispatch(loadQuestions(res))
}

export const answerQuestionAsync = (authedUser, qid, answer) => async (dispatch) => {
    dispatch({ type: types.SAVING_ANSWER })
    const res = await API._saveQuestionAnswer({ authedUser, qid, answer })
    dispatch({ type: types.ANSWER_SAVED, payload: res })
}

export const saveQuestionAsync = ({ optionOneText, optionTwoText }) => async (dispatch, getState) => {
    const { user } = getState()
    const author = user.id
    dispatch({ type: types.SAVING_QUESTION })
    const res = await API._saveQuestion({ optionOneText, optionTwoText, author })
    dispatch({ type: types.QUESTION_SAVED, payload: res })
}