import React from 'react'
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { saveQuestionAsync } from '../store/actions'
import { useNavigate } from 'react-router'

const NewPoll = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const savingQuestion = useSelector(state => state.savingQuestion)
    const user = useSelector(state => state.user)

    const onValidSubmit = (formData) => {

        let question = { author: user.id, optionOneText: formData.optionOneText, optionTwoText: formData.optionTwoText }

        dispatch(saveQuestionAsync(question)).then(() => navigate("/"))


    }
    return (
        <Grid textAlign='center'>
            <Grid.Column textAlign='left' style={{ maxWidth: '500px' }}>
                <Segment raised className='background-color'>
                    <Header as='h3' color='teal'>
                        Add New Poll
                    </Header>
                    <Divider />
                    <Form onValidSubmit={onValidSubmit}>
                        <Form.Input
                            instantValidation={false}
                            required
                            name="optionOneText"
                            label="Option One"

                        />

                        <Form.Input
                            instantValidation={false}
                            required
                            name="optionTwoText"
                            label="Option Two"

                        />
                        <Button type='submit' color='teal' fluid loading={savingQuestion}>Save</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default NewPoll
