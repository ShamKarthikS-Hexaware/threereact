const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EditPlayer from '../EditPlayer'
import { playerAdded } from '../store/playerSlice'
beforeAll(() => {
    store.dispatch(
        playerAdded({
            id: 1,
            name: 'name',
            age: 64,
            game: 'game',
            rating: 81.98,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="player/edit/1" replace />
                                }
                            />
                            <Route
                                path="player/edit/:id"
                                element={<EditPlayer />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of PlayerEdit Component', () => {
    test('should render EditPlayer and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const savePlayerButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const gameElement = screen.getByLabelText(/Game/i)
        const ratingElement = screen.getByLabelText(/Rating/i)

        expect(savePlayerButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(gameElement).toBeInTheDocument()
        expect(ratingElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Player edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const gameElement = screen.getByLabelText(/Game/i)
        const ratingElement = screen.getByLabelText(/Rating/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(ageElement, { target: { value: 91 } })
        fireEvent.change(gameElement, { target: { value: 'game' } })
        fireEvent.change(ratingElement, { target: { value: 4.53 } })

        expect(nameElement.value).toBe('name')

        expect(ageElement.value).toBe('91')
        expect(gameElement.value).toBe('game')

        expect(ratingElement.value).toBe('4.53')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const gameElement = screen.getByLabelText(/Game/i)
        const ratingElement = screen.getByLabelText(/Rating/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(ageElement, { target: { value: '' } })
        fireEvent.change(gameElement, { target: { value: '' } })
        fireEvent.change(ratingElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const savePlayerButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(savePlayerButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
