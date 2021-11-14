import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Divider, Header, Icon, Image, Message, Modal, Segment, Tab } from 'semantic-ui-react'
import * as _ from 'lodash'


import { users } from '../data/users'
import Moment from 'react-moment'
import { Form } from 'formsy-semantic-ui-react'
import { answerQuestion } from '../store/actions'
import NoQuestions from '../components/NoQuestions'

const Home = () => {

    const questions = useSelector((state) => state.questions)
    const answers = useSelector((state) => state.answers)
    const user = useSelector((state) => state.user)

    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState()
    const dispatch = useDispatch()
    const [questionToAnswer, setQuestionToAnswer] = useState()
    const handleSelect = (value) => {
        setSelected(value)
    }

    const prepareToAnswer = (question) => {
        setSelected(null)
        setQuestionToAnswer(question)
        setShowModal(true)
    }

    const answer = () => {
        dispatch(answerQuestion(questionToAnswer.id, selected))
        setShowModal(false)
    }

    const unansweredQuestions = () => {
        const userAnswers = answers.filter((i) => i.user === user.username)
        const remainingQuestions = questions.filter((item) => !_.includes(userAnswers.map(a => a.id), item.id))

        if (questions.length !== 0 && remainingQuestions.length === 0) {

            return (
                <Message positive fluid>
                    <Message.Header>Congratulation</Message.Header>
                    <p>
                        you answer all available questions.
                    </p>
                </Message>
            )

        }
        return (<Card.Group textAlign='center'>
            {
                remainingQuestions.map((question) => {
                    const questionUser = users.find((u) => u.username === question.addedBy)
                    return <Card key={question.id} fluid className='content-color'>
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
                            <Button basic color='blue' fluid onClick={() => prepareToAnswer(question)}>
                                Answer <Icon style={{ margin: '0 10px' }} name='check' />
                            </Button>
                        </Card.Content>
                    </Card>
                }
                )
            }
        </Card.Group>)



    }

    const answeredQuestions = () => {
        const userAnswers = answers.filter((i) => i.user === user.username)

        if (questions.length !== 0 && userAnswers.length === 0) {

            return (
                <Message negative fluid>
                    <Message.Header>No Answers</Message.Header>
                    <p>
                        you didn't answer any question.
                    </p>
                </Message>
            )

        }
        return (
            <Card.Group textAlign='center'>
                {userAnswers.map((answer) => {
                    const question = questions.find(q => q.id === answer.id)
                    const questionUser = users.find((u) => u.username === question.addedBy)
                    return <Card key={question.id} fluid className='content-color'>
                        <Card.Content>
                            {questionUser &&
                                <Image
                                    floated='right'
                                    size='mini'
                                    src={questionUser.image}
                                />}
                            <Card.Header>{question.addedBy} Ask ?</Card.Header>
                            <Card.Meta><Moment format="YYYY/MM/DD">{question.addedDate}</Moment></Card.Meta>
                            <Card.Description>
                                would you rather <strong>{question.firstOption}</strong> or <strong>{question.secondOption}</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            Your answer : {answer.answer === 'firstOption' ? question.firstOption : question.secondOption}
                        </Card.Content>
                    </Card>
                })}
            </Card.Group>
        )
    }


    const panes = [
        { menuItem: 'Unanswered Questions', render: () => <Tab.Pane>{unansweredQuestions()}</Tab.Pane> },
        { menuItem: 'Answered Questions', render: () => <Tab.Pane>{answeredQuestions()}</Tab.Pane> },
    ]


    if (questions.length === 0) {
        return <NoQuestions />
    }

    return (
        <Segment className='content-color'>

            <Header as='h2' style={{ marginTop: '10px' }}>
                Question Review
                <Header.Subheader>
                    review both answered or unanswered questions
                </Header.Subheader>
            </Header>
            <Divider />
            <Tab menu={{ attached: 'top' }} panes={panes} className='background-color' />
            {questionToAnswer &&
                <Modal
                    onClose={() => setShowModal(false)}
                    onOpen={() => setShowModal(true)}
                    open={showModal}
                >
                    <Modal.Header as='h4'>{questionToAnswer.addedBy} Ask?</Modal.Header>
                    <Modal.Content >

                        <Modal.Description>
                            <Header as='h4'>Would you rather :</Header>
                            <div style={{ margin: '10px 40px' }}>
                                <Form>
                                    <Form.Radio
                                        label={questionToAnswer.firstOption}
                                        value='firstOption'
                                        checked={selected === 'firstOption'}
                                        onChange={(e, { value }) => handleSelect(value)}
                                    />
                                    <Form.Radio
                                        label={questionToAnswer.secondOption}
                                        value='secondOption'
                                        checked={selected === 'secondOption'}
                                        onChange={(e, { value }) => handleSelect(value)}
                                    />
                                </Form>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => answer()}
                            positive
                        >Submit</Button>
                    </Modal.Actions>
                </Modal>
            }
        </Segment>
    )
}

export default Home
