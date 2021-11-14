import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

const RequiredAuth = () => {

    const user = useSelector((state) => state.user)

    let location = useLocation();
    if (!user) {

        return <Navigate to="/login" state={{ from: location }} />
    }
    return <Outlet />
}

export default RequiredAuth
