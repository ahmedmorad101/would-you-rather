import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import NoQuestions from '../components/NoQuestions'
import QuestionContent from '../components/QuestionContent'

const Question = () => {
    const params = useParams()
    const questions = useSelector(state => state.questions)
    const { question_id } = params
    if (!question_id) {
        return <NoQuestions />
    }

    const question = Object.values(questions).find(i => i.id === question_id)
    if (!question) {
        return <NoQuestions />
    }
    return <QuestionContent question={question}/>
}

export default Question
