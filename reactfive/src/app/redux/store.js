import { configureStore } from '@reduxjs/toolkit'
import studentReducer from '../views/student/store/studentSlice'
import playerReducer from '../views/player/store/playerSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../services/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        player: playerReducer,
        student: studentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
