import React from 'react'
import PublicRoutes from './publicRoutes'
import PrivateRoutes from './privateRoutes'
import NotFound from '../pages/not-found'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes, exposedRoutes } from './routesData'

function AppRoutes() {
    return (
        <>
            <Routes>
                {exposedRoutes.map((elem, index) => (
                    <Route key={index} element={elem.element} path={elem.path} />
                ))}

                {publicRoutes.map((elem, index) => (
                    <Route key={index} element={<PublicRoutes>{elem.element}</PublicRoutes>} path={elem.path} />
                ))}

                {privateRoutes.map((elem, index) => (
                    <Route key={index} element={<PrivateRoutes>{elem.element}</PrivateRoutes>} path={elem.path} />
                ))}

                <Route element={<NotFound />} path="*" />
            </Routes>
        </>
    );
}

export default AppRoutes
