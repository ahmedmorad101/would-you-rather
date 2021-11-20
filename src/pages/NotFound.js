import React from 'react'
import { useNavigate } from 'react-router'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Segment placeholder className="content-color">
            <Header icon>
                <Icon color='red' name='warning sign' />
                Page Not Found
            </Header>
            <Button  onClick={() => navigate("/home")} primary>Home Page</Button>
        </Segment>
    )
}

export default NotFound
