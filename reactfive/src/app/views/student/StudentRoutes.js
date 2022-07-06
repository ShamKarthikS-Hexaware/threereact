import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const StudentList = Loadable(lazy(() => import('./StudentList')))
const EditStudent = Loadable(lazy(() => import('./EditStudent')))
const AddStudent = Loadable(lazy(() => import('./AddStudent')))

const studentRoutes = [
    {
        path: '/student',
        element: <StudentList />,
    },
    {
        path: '/student/edit/:id',
        element: <EditStudent />,
    },
    {
        path: '/student/add',
        element: <AddStudent />,
    },
]

export default studentRoutes
