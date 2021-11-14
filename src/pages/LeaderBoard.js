import React from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Card, CardGroup, Divider, Header, Icon, Image, Progress, Segment } from 'semantic-ui-react'
import NoQuestions from '../components/NoQuestions'

import { users } from '../data/users'
import { toggleShowUsers } from '../store/actions'

const LeaderBoard = () => {
    const questions = useSelector(state => state.questions)
    const answers = useSelector(state => state.answers)
    const currentUser = useSelector(state => state.user.username)
    const dispatch = useDispatch()

    const handleClick = (e, props) => {
        dispatch(toggleShowUsers(props.index))
    }

    if (questions.length === 0) {
        return <NoQuestions />
    }

    return (
        <Segment className='content-color'>
            <Header as='h2'>
                Leader Board
            </Header>
            <Divider />
            <CardGroup>
                {questions.map((question) => {
                    const questionUser = users.find((u) => u.username === question.addedBy)
                    const firstOptionCount = answers.filter((a) => a.id === question.id && a.answer === 'firstOption').length
                    const secondOptionCount = answers.filter((a) => a.id === question.id && a.answer === 'secondOption').length
                    const totalCount = firstOptionCount + secondOptionCount

                    console.log(firstOptionCount)
                    console.log(secondOptionCount)

                    const firstOptionPercent = totalCount > 0 ? Math.round((firstOptionCount / totalCount) * 10000) / 100 : 0
                    const secondOptionPercent = totalCount > 0 ? Math.round((secondOptionCount / totalCount) * 10000) / 100 : 0
                    return <Card key={question.id} fluid className='background-color'>
                        <Card.Content>
                            {questionUser &&
                                <Image
                                    floated='right'
                                    size='mini'
                                    src={questionUser.image}
                                />
                            }
                            <Card.Header>{question.addedBy} Ask ?</Card.Header>
                            <Card.Meta><Moment format="YYYY/MM/DD">{question.addedDate}</Moment></Card.Meta>
                            <Card.Description>
                                would you rather <strong>{question.firstOption}</strong> or <strong>{question.secondOption}</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Progress percent={firstOptionPercent} progress label={question.firstOption} size='small' color='blue'/>
                            <Progress percent={secondOptionPercent} progress label={question.secondOption} size='small' color='olive' />
                            {answers.filter(e => e.id === question.id).length > 0 &&
                                <Accordion fluid >
                                    <Accordion.Title
                                        active={question.showAnswersForUser===currentUser}
                                        index={question.id}
                                        onClick={handleClick}
                                    >
                                        <Icon name='dropdown' />
                                        Show Answers
                                    </Accordion.Title>
                                    <Accordion.Content active={question.showAnswersForUser===currentUser}>
                                        {
                                            answers.filter(e => e.id === question.id).map(m => {
                                                let user = users.find(u => u.username === m.user)
                                                return (
                                                    <div key={m.user} style={{ marginBottom: '6px' }}>
                                                        <Image avatar src={user.image} size="mini" spaced /> {user.username === currentUser ? 'Your' : user.username} answer : <strong>{m.answer === 'firstOption' ? question.firstOption : question.secondOption}</strong>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Accordion.Content>
                                </Accordion>}
                        </Card.Content>

                    </Card>
                })}
            </CardGroup>
        </Segment>
    )
}

export default LeaderBoard
