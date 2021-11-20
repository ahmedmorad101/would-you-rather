import * as _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { CardGroup, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'
import NoQuestions from '../components/NoQuestions'
import QuestionContent from '../components/QuestionContent'


const Questions = () => {
    const questions = useSelector(state => state.questions)

    if (questions.length === 0) {
        return <NoQuestions />
    }

    return (
        <Segment className='content-color'>
            <Header as='h2'>
                <Grid divided>
                    <Grid.Row>
                        <Grid.Column verticalAlign='bottom'><Image src='/assets/images/question.png' size='small' /></Grid.Column>
                        <Grid.Column verticalAlign='bottom' width='10' >Questions</Grid.Column>
                    </Grid.Row>
                </Grid>
                <div style={{ marginBottom: '10px' }}></div>
                <Divider />
            </Header>

            <CardGroup >
                {_.reverse(_.sortBy(Object.values(questions), (i) => i.optionOne.votes.length + i.optionTwo.votes.length)).map((question, idx) => (<QuestionContent key={idx} question={question} />))}
            </CardGroup>
        </Segment>
    )
}

export default Questions
