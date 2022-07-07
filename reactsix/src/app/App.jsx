import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
// import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import Notification from './services/notification/Notification'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback, { myErrorHandler } from './views/sessions/Error'

const App = () => {
    const all_pages = useRoutes(AllPages())

    return (
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
                        {/* <AuthProvider>{all_pages}</AuthProvider> */}
                        {all_pages}
                        <Notification />
                    </ErrorBoundary>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App
