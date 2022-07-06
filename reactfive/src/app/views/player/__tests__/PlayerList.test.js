const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import PlayerList from '../PlayerList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Player rows when api response has data', async () => {
    const endPoint = 'player'
    const getPlayerListResponse = [
        {
            id: 1,
            name: 'name1',
            age: 97,
            game: 'game1',
            rating: 8.82,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getPlayerListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <PlayerList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const playerNameCell = await screen.findByText(/name1/i)

    expect(playerNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
