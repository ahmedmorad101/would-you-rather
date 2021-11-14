import React from 'react'
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'
import { useDispatch } from 'react-redux'
import { addQuestion } from '../store/actions'
import { useNavigate } from 'react-router'

const NewQuestion = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const onValidSubmit = (formData) => {
        
        dispatch(addQuestion(formData))
        navigate("/")

    }
    return (
        <Grid textAlign='center'>
            <Grid.Column textAlign='left' style={{ maxWidth: '500px' }}>
                <Segment raised  className='content-color'>
                    <Header as='h3' color='teal'>
                        Create Your Question
                    </Header>
                    <Divider />
                    <Form onValidSubmit={onValidSubmit}>
                        <Form.Input
                            instantValidation={false}
                            required
                            name="firstOption"
                            label="First Option"

                        />

                        <Form.Input
                            instantValidation={false}
                            required
                            name="secondOption"
                            label="Second Option"

                        />
                        <Button type='submit' color='blue' fluid>Save</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default NewQuestion
