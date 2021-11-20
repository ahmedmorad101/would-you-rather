import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardGroup, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'
import * as _ from 'lodash'

const Leaderboard = () => {

    const users = useSelector(state => state.users)

    return (
        <div>
            <Segment className='content-color'>
                <Header as='h2'>
                    <Grid divided>
                        <Grid.Row>
                            <Grid.Column verticalAlign='bottom'><Image src='/assets/images/podium.png' size='small' /></Grid.Column>
                            <Grid.Column verticalAlign='bottom' width='10' >Leadership</Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <div style={{ marginBottom: '10px' }}></div>
                    <Divider />
                </Header>

                <CardGroup style={{ margin: '5px 0' }}>
                    {_.reverse(_.sortBy(Object.values(users), (i) => i.questions.length + Object.keys(i.answers).length)).map((user, idx) => {
                        let idxImage = 'one.png'
                        switch (idx) {
                            case 0:
                                idxImage = 'one.png'
                                break;
                            case 1:
                                idxImage = 'two.png'
                                break;
                            case 2:
                                idxImage = 'three.png'
                                break;
                            default:
                                break;
                        }
                        return <Card key={user.id} fluid className='background-color'>
                            <Card.Content>


                                <Card.Header>
                                    <Image
                                        floated='left'
                                        size='mini'
                                        src={user.avatarURL}
                                    />


                                    <Image
                                        floated='right'
                                        size='mini'
                                        src={`/assets/images/${idxImage}`}
                                    />
                                    {user.name}
                                </Card.Header>
                                <Card.Meta>

                                </Card.Meta>
                                <Card.Description>

                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                Questions : {user.questions.length} , Answers: {Object.keys(user.answers).length}
                            </Card.Content>

                        </Card>
                    })}
                </CardGroup>
            </Segment>
        </div>
    )
}

export default Leaderboard
