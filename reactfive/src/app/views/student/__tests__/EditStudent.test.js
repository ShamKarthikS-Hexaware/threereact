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
import EditStudent from '../EditStudent'
import { studentAdded } from '../store/studentSlice'
beforeAll(() => {
    store.dispatch(
        studentAdded({
            id: 1,
            name: 'name',
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
                                    <Navigate to="student/edit/1" replace />
                                }
                            />
                            <Route
                                path="student/edit/:id"
                                element={<EditStudent />}
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

describe('testing view of StudentEdit Component', () => {
    test('should render EditStudent and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveStudentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)

        expect(saveStudentButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Student edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })

        expect(nameElement.value).toBe('name')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveStudentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveStudentButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(1)
    })
})
