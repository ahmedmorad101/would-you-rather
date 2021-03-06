import React from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Card, Icon, Image, Progress } from 'semantic-ui-react'
import { toggleShowUsers } from '../store/actions'

const QuestionContent = (props) => {
    
    const currentUser = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    const handleClick = (e, props) => {
        dispatch(toggleShowUsers(props.index))
    }

    const question = props.question
    const questionUser = users[question.author]
    const firstOptionCount = question.optionOne.votes.length
    const secondOptionCount = question.optionTwo.votes.length
    const totalCount = firstOptionCount + secondOptionCount


    const firstOptionPercent = totalCount > 0 ? Math.round((firstOptionCount / totalCount) * 10000) / 100 : 0
    const secondOptionPercent = totalCount > 0 ? Math.round((secondOptionCount / totalCount) * 10000) / 100 : 0
    return <Card key={question.id} fluid className='background-color'>
        <Card.Content>
            {questionUser &&
                <Image
                    floated='right'
                    size='mini'
                    src={questionUser.avatarURL}
                />
            }
            <Card.Header>
                {questionUser.name} Ask ?
            </Card.Header>
            <Card.Meta>
                <Moment format="YYYY/MM/DD">{question.timestamp}</Moment>
            </Card.Meta>
            <Card.Description>
                would you rather <strong style={{ color: '#2185d0' }}>{question.optionOne.text}</strong> or <strong style={{ color: '#90a500' }}>{question.optionTwo.text}</strong>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Progress percent={firstOptionPercent} progress label={question.optionOne.text} size='small' color='blue' />
            <Progress percent={secondOptionPercent} progress label={question.optionTwo.text} size='small' color='olive' />
            Total answers : {totalCount}
            {totalCount > 0 &&
                <Accordion fluid >
                    <Accordion.Title
                        active={question.showAnswers === currentUser.id}
                        index={question.id}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown' />
                        Show Answers
                    </Accordion.Title>
                    <Accordion.Content active={question.showAnswers === currentUser.id}>
                        {
                            question.optionOne.votes.map(m => {
                                let user = users[m]
                                return (
                                    <div key={user.id} style={{ marginBottom: '6px' }}>
                                        <Image avatar src={user.avatarURL} size="mini" spaced />
                                        {user.id === currentUser.id ? 'Your' : user.name} answer : <strong>{user.answers[question.id] === 'optionOne' ? question.optionOne.text : question.optionTwo.text}</strong>
                                    </div>
                                )
                            })

                        }
                        {
                            question.optionTwo.votes.map(m => {
                                let user = users[m]
                                return (
                                    <div key={user.id} style={{ marginBottom: '6px' }}>
                                        <Image avatar src={user.avatarURL} size="mini" spaced />
                                        {user.id === currentUser.id ? 'Your' : user.name} answer : <strong>{user.answers[question.id] === 'optionOne' ? question.optionOne.text : question.optionTwo.text}</strong>
                                    </div>
                                )
                            })

                        }
                    </Accordion.Content>
                </Accordion>}
        </Card.Content>

    </Card>
}

export default QuestionContent
