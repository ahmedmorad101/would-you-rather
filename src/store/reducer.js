import { v4 } from 'uuid'
import * as types from './types'
const initialState = {
    user: null,
    questions: [],
    users: [],
    loadingUsers: false,
    loadingQuestions: false,
    savingAnswer: false,
    savingQuestion: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case types.LOAD_USERS:
            return { ...state, users: action.payload, loadingUsers: false }

        case types.LOADING_USERS:
            return { ...state, loadingUsers: true }


        case types.LOAD_QUESTIONS:
            return { ...state, questions: action.payload, loadingQuestions: false }

        case types.LOADING_QUESTIONS:
            return { ...state, loadingQuestions: true }

        case types.SAVING_ANSWER:
            return { ...state, savingAnswer: true }


        case types.ANSWER_SAVED:
            return { ...state, savingAnswer: false, users: action.payload.users, questions: action.payload.questions, user: action.payload.users[state.user.id] }



        case types.SAVING_QUESTION:
            return { ...state, savingQuestion: true }
        case types.QUESTION_SAVED:
            return { ...state, savingQuestion: false, users: action.payload.users, questions: action.payload.questions, user: action.payload.users[state.user.id] }

        case types.LOGIN:
            return { ...state, user: action.payload }


        case types.ADD_QUESTION:
            let newQuestion = action.payload
            newQuestion.id = v4()
            newQuestion.addedBy = state.user.username
            newQuestion.addedDate = new Date()
            return { ...state, questions: [...state.questions, newQuestion] }

        case types.ANSWER_QUESTION:
            let answer = action.payload
            answer.user = state.user.username
            return { ...state, answers: [...state.answers, answer] }

        case types.TOGGLE_SHOW_USERS:

            const q = state.questions[action.payload]
            let question = { ...q, showAnswers: q.showAnswers === state.user.id ? '-' : state.user.id }
            let questions = { ...state.questions, [action.payload]: question }

            return { ...state, questions: questions }
        default:
            return state;
    }
}

export default reducer