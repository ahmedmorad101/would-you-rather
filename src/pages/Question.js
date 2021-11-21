import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import QuestionContent from '../components/QuestionContent'
import NotFound from './NotFound'

const Question = () => {
    const params = useParams()
    const questions = useSelector(state => state.questions)
    const { question_id } = params
    if (!question_id) {
        return <NotFound />
    }

    const question = Object.values(questions).find(i => i.id === question_id)
    if (!question) {
        return <NotFound />
    }
    return <QuestionContent question={question}/>
}

export default Question
