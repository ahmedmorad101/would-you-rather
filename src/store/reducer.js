import { v4 } from 'uuid'
import * as types from './types'
const initialState = {
    user: null,
    questions: [],
    answers: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
            let questions = [...state.questions]
            let question = questions.find(e=>e.id===action.payload)

            question.showAnswersForUser = question.showAnswersForUser === state.user.username ? '-' : state.user.username
            return { ...state, questions: questions }
        default:
            return state;
    }
}

export default reducer