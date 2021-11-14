import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button, Select, Form, Grid, Header, Segment, Image } from 'semantic-ui-react'
import { login } from '../store/actions'


import { users } from '../data/users'

const Login = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    const doLogin = (e) => {
        e.preventDefault()
        const _user = users.find(u => u.username === user)
        dispatch(login(_user))
        navigate("/")
    }
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: '400px' }}>

                <Segment raised>
                    <Header as='h3' color='teal'>
                        <div className='circle-image'>
                            <Image src="/assets/images/buttons.png" />
                        </div> Would you rather
                        <br/>
                        Login
                    </Header>

                    <Form onSubmit={doLogin}>

                        <Form.Field
                            name='user'
                            value={user}
                            onChange={(e, { value }) => { setUser(value); }}
                            fluid
                            control={Select}
                            options={users.map((e) => { return { key: e.username, value: e.username, text: e.username, image: e.image } })}
                            clearable
                            placeholder='Select User'
                        />
                        <Button color='teal' type='submit' fluid>Login</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default Login
