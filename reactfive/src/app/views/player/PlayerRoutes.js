import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const PlayerList = Loadable(lazy(() => import('./PlayerList')))
const EditPlayer = Loadable(lazy(() => import('./EditPlayer')))
const AddPlayer = Loadable(lazy(() => import('./AddPlayer')))

const playerRoutes = [
    {
        path: '/player',
        element: <PlayerList />,
    },
    {
        path: '/player/edit/:id',
        element: <EditPlayer />,
    },
    {
        path: '/player/add',
        element: <AddPlayer />,
    },
]

export default playerRoutes
