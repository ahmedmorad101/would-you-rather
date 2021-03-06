import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Divider, Header, Icon, Image, Message, Modal, Segment, Tab } from 'semantic-ui-react'
import * as _ from 'lodash'
import Moment from 'react-moment'
import { Form } from 'formsy-semantic-ui-react'
import { answerQuestionAsync } from '../store/actions'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'

const Home = () => {

    const questions = useSelector((state) => state.questions)
    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)
    const savingAnswer = useSelector((state) => state.savingAnswer)
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState()
    const dispatch = useDispatch()
    const [questionToAnswer, setQuestionToAnswer] = useState()
    const [activeIndex, setActiveIndex] = useState(0)

    const navigate = useNavigate()
    const handleSelect = (value) => {
        setSelected(value)
    }

    const prepareToAnswer = (question) => {
        setSelected(null)
        setQuestionToAnswer(question)
        setShowModal(true)
    }

    const answer = () => {
        if (!selected) { return }

        dispatch(answerQuestionAsync(user.id, questionToAnswer.id, selected)).then(() => setShowModal(false))


    }

    const unansweredQuestions = () => {
        const userAnswers = Object.keys(user.answers)
        const remainingQuestions = _.reverse(_.sortBy(Object.values(questions).filter((item) => !_.includes(userAnswers, item.id)), e => e.timestamp))

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
                    const questionUser = users[question.author]
                    return <Card key={question.id} fluid className='background-color'>
                        <Card.Content>
                            {questionUser &&
                                <Image
                                    floated='right'
                                    size='mini'
                                    src={questionUser.avatarURL}
                                />
                            }
                            <Card.Header>{questionUser.name} Ask  ? </Card.Header>
                            <Card.Meta>
                                <Moment format="YYYY/MM/DD">{question.timestamp}</Moment>
                            </Card.Meta>
                            <Card.Description>
                                would you rather <strong style={{ color: '#2185d0' }}>{question.optionOne.text}</strong> or <strong style={{ color: '#90a500' }}>{question.optionTwo.text}</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button basic color='teal' onClick={() => prepareToAnswer(question)}>
                                Vote <Icon style={{ margin: '0 10px' }} name='check' />
                            </Button>


                            <Button basic floated='right' color='facebook' onClick={() => navigate(`/questions/${question.id}`)}>
                                View Details <Icon style={{ margin: '0 10px' }} name='folder open outline' />
                            </Button>


                        </Card.Content>
                    </Card>
                }
                )
            }
        </Card.Group>)



    }

    const answeredQuestions = () => {

        const userAnswers = Object.keys(user.answers)

        const answeredQuestions = _.reverse(_.sortBy(Object.values(questions).filter((item) => _.includes(Object.keys(user.answers), item.id)), e => e.timestamp))

        if (questions && userAnswers.length === 0) {

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
                {answeredQuestions.map((question) => {

                    const questionUser = users[question.author]
                    return <Card key={question.id} fluid className='background-color'>
                        <Card.Content>
                            {questionUser &&
                                <Image
                                    floated='right'
                                    size='mini'
                                    src={questionUser.avatarURL}
                                />}
                            <Card.Header>{questionUser.name} Ask ? </Card.Header>
                            <Card.Meta>
                                <Moment format="YYYY/MM/DD">{question.timestamp}</Moment>
                            </Card.Meta>
                            <Card.Description>
                                would you rather <strong style={{ color: '#2185d0' }}>{question.optionOne.text}</strong> or <strong style={{ color: '#90a500' }}>{question.optionTwo.text}</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            Your answer : {user.answers[question.id] === 'optionOne' ? question.optionOne.text : question.optionTwo.text}


                            <NavLink to={`/questions/${question.id}`} style={{ float: 'right' }}>View Details</NavLink>
                        </Card.Content>
                    </Card>
                })}

                <br/>
            
            </Card.Group>
        )
    }


    const panes = [
        {
            menuItem: 'Unanswered Questions', render: () =>
                <Tab.Pane className='content-color'>{
                    unansweredQuestions()
                }
                </Tab.Pane>
        },
        {
            menuItem: 'Answered Questions', render: () => <Tab.Pane className='content-color'>{
                answeredQuestions()
            }</Tab.Pane>
        }

    ]

    const opentTab = (index) => {
        navigate(`#${index}`, { replace: false })
    }

    if (location.hash === '#1' && activeIndex !== 1) {
        setActiveIndex(1)
    }
    else if (location.hash === '#0' && activeIndex !== 0) {
        setActiveIndex(0)
    }

    return (
        <Segment className='content-color'>

            <Header as='h2' style={{ marginTop: '10px' }}>
                <Image src="/assets/images/question.png" size='medium' floated='left' />
                Question Review
                <Header.Subheader>
                    review both answered and unanswered questions
                </Header.Subheader>
            </Header>
            <Divider />
            <Tab menu={{ attached: 'top', className: 'content-color tabs' }} activeIndex={activeIndex} panes={panes} onTabChange={(e, { activeIndex }) => opentTab(activeIndex)} />
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
                                        label={questionToAnswer.optionOne.text}
                                        value='optionOne'
                                        checked={selected === 'optionOne'}
                                        onChange={(e, { value }) => handleSelect(value)}
                                    />
                                    <Form.Radio
                                        label={questionToAnswer.optionTwo.text}
                                        value='optionTwo'
                                        checked={selected === 'optionTwo'}
                                        onChange={(e, { value }) => handleSelect(value)}
                                    />
                                </Form>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => answer()}
                            color='teal'
                            loading={savingAnswer}
                            disabled={!selected}
                        >Submit</Button>
                    </Modal.Actions>
                </Modal>
            }
        </Segment>
    )
}

export default Home
