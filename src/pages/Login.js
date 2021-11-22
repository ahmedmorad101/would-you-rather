import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Button, Select, Form, Grid, Header, Segment, Image } from 'semantic-ui-react'
import { loadUsersAsync, login } from '../store/actions'


// import { users } from '../data/users'


const Login = () => {
    let navigate = useNavigate();
    let location = useLocation()
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    const loadingUsers = useSelector(state => state.loadingUsers)
    const users = useSelector(state => state.users)



    useEffect(() => {
        dispatch(loadUsersAsync())
    }, [dispatch])

    const doLogin = (e) => {
        e.preventDefault()
        const _user = Object.values(users).find(u => u.id === user)
        dispatch(login(_user))
        if (location.state?.from) {
            navigate(location.state.from)
        } else {
            navigate("/home")
        }
    }
    
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: '400px' }}>

                <Segment raised loading={loadingUsers} className='background-color'>
                    <Header as='h3' color='teal'>
                        <div className='circle-image'>
                            <Image src="/assets/images/buttons.png" />
                        </div> Would you rather
                        <br />
                        Login
                    </Header>

                    <Form onSubmit={doLogin}>


                        <Form.Field
                            name='user'
                            value={user}
                            onChange={(e, { value }) => { setUser(value) }}
                            fluid
                            control={Select}
                            options={Object.values(users).map((e) => { return { key: e.id, value: e.id, text: e.name, image: e.avatarURL } })}
                            clearable
                            placeholder='Select User'
                        />
                        {/* <Form.Field
                            name='user'
                            value={user}
                            onChange={(e, { value }) => { setUser(value); }}
                            fluid
                            control={Select}
                            options={users.map((e) => { return { key: e.username, value: e.username, text: e.username, image: e.image } })}
                            clearable
                            placeholder='Select User'
                        /> */}
                        <Button color='teal' type='submit' fluid>Login</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default Login
