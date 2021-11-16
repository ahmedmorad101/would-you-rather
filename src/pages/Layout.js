import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Container, Dimmer, Divider, Dropdown, Icon, Image, Loader, Menu } from 'semantic-ui-react'
import { loadQuestionsAsync, logout } from '../store/actions';


const Layout = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const loadingQuestions = useSelector((state) => state.loadingQuestions)

    useEffect(() => {
        
            dispatch(loadQuestionsAsync())
        
    }, [dispatch])

    return (
        <>
            <Dimmer active={loadingQuestions} inverted>
                <Loader />
            </Dimmer>
            <Menu fixed='top' style={{ backgroundColor: '#e9edc9' }}>
                <Menu.Item header style={{ color: 'green' }} onClick={() => navigate("/")}>
                    <Image src="/assets/images/buttons.png" style={{ width: '18px', height: '18px', margin: '0 10px' }} />    Would you rather
                </Menu.Item>
                <Menu.Item
                    name='home'
                    active={location.pathname === '/home' || location.pathname === '/'}
                    onClick={() => navigate("/")}
                />
                <Menu.Item
                    name='New Question'
                    active={location.pathname === '/new-question'}
                    onClick={() => navigate("/new-question")}
                />
                <Menu.Item
                    name='Leader Board'
                    active={location.pathname === '/leaderboard'}
                    onClick={() => navigate("/leaderboard")}
                />

                <Menu.Menu position='right'>
                    <Dropdown text={user.name} icon={<Image src={user.avatarURL} avatar style={{ width: '18px', height: '18px', margin: '0 10px' }} />} item >
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    dispatch(logout())
                                    navigate("/login")
                                }}> Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Menu>
            </Menu>
            <Container className="app-container">
                <Outlet />
            </Container>
            <Divider style={{}} />
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', margin: '10px 0' }}>Copyright <Icon name='copyright outline' />2021 by Eng. Ahmed Mourad</div>
            </div>
        </>
    )
}

export default Layout
