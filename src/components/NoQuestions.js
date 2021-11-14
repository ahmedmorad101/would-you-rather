import React from 'react'
import { NavLink } from 'react-router-dom'
import { Message } from 'semantic-ui-react'

const NoQuestions = () => {
    return (

        <Message info>
            No Questions found , you can <NavLink style={{ fontWeight: 'bold', textDecoration: 'underline' }} to="/new-question">add new Question</NavLink>
        </Message>

    )
}

export default NoQuestions
