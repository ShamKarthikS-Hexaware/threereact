import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'app/redux/store'
import {
    fetchStudent,
    addStudent,
    editStudent,
    deleteStudent,
} from '../student.action'

const getStudentListResponse = [
    {
        id: 1,
        name: 'name',
    },
]

const addStudentListResponse = (data) => {
    return { id: 2, ...data }
}
const editStudentListResponse = (data) => {
    return data
}

describe('should test Student redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'student'
    test('Should be able to fetch the student list and update student redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
        const result = await store.dispatch(fetchStudent())
        const studentList = result.payload
        expect(result.type).toBe('student/fetchStudent/fulfilled')
        expect(studentList).toEqual(getStudentListResponse)

        const state = store.getState().student
        expect(state.entities).toEqual(studentList)
    })

    test('Should be able to add new student to list and make post api and update student redux store', async () => {
        const body = {
            name: 'name',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addStudentListResponse(body)
        )
        const result = await store.dispatch(addStudent(body))
        const studentItem = result.payload
        expect(result.type).toBe('student/addStudent/fulfilled')
        expect(studentItem).toEqual(addStudentListResponse(body))

        const state = store.getState().student
        expect(state.entities).toContainEqual(addStudentListResponse(body))
    })

    test('Should be able to edit student in list and make put api call and update student redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editStudentListResponse(body)
        )
        const result = await store.dispatch(editStudent(body))
        const studentItem = result.payload
        expect(result.type).toBe('student/editStudent/fulfilled')
        expect(studentItem).toEqual(editStudentListResponse(body))

        const state = store.getState().student
        let changedStudent = state.entities.find((p) => p.id === body.id)
        expect(changedStudent.name).toEqual(body.name)
    })

    test('Should be able to delete student in list and update student redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().student
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteStudent(input))
        const deletId = result.payload
        expect(result.type).toBe('student/deleteStudent/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().student
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
