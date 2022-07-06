import { createSlice } from '@reduxjs/toolkit'
import { fetchStudent } from './student.action'
import { addStudent } from './student.action'
import { editStudent } from './student.action'
import { deleteStudent } from './student.action'

const fetchStudentExtraReducer = {
    [fetchStudent.pending]: (state, action) => {
        state.loading = true
    },
    [fetchStudent.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchStudent.rejected]: (state, action) => {
        state.loading = false
    },
}

const addStudentExtraReducer = {
    [addStudent.pending]: (state, action) => {
        state.loading = true
    },
    [addStudent.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addStudent.rejected]: (state, action) => {
        state.loading = false
    },
}

const editStudentExtraReducer = {
    [editStudent.pending]: (state, action) => {
        state.loading = true
    },
    [editStudent.fulfilled]: (state, action) => {
        const { id, name } = action.payload
        const existingStudent = state.entities.find(
            (student) => student.id.toString() === id.toString()
        )
        if (existingStudent) {
            existingStudent.name = name
        }
        state.loading = false
    },
    [editStudent.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteStudentExtraReducer = {
    [deleteStudent.pending]: (state, action) => {
        state.loading = true
    },
    [deleteStudent.fulfilled]: (state, action) => {
        const id = action.payload
        const existingStudent = state.entities.find(
            (student) => student.id.toString() === id.toString()
        )
        if (existingStudent) {
            state.entities = state.entities.filter(
                (student) => student.id !== id
            )
        }
        state.loading = false
    },
    [deleteStudent.rejected]: (state, action) => {
        state.loading = false
    },
}
const studentSlice = createSlice({
    name: 'student',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        studentAdded(state, action) {
            state.entities.push(action.payload)
        },
        studentUpdated(state, action) {
            const { id, name } = action.payload
            const existingStudent = state.entities.find(
                (student) => student.id.toString() === id.toString()
            )
            if (existingStudent) {
                existingStudent.name = name
            }
        },
        studentDeleted(state, action) {
            const { id } = action.payload
            const existingStudent = state.entities.find(
                (student) => student.id.toString() === id.toString()
            )
            if (existingStudent) {
                state.entities = state.entities.filter(
                    (student) => student.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchStudentExtraReducer,
        ...addStudentExtraReducer,
        ...editStudentExtraReducer,
        ...deleteStudentExtraReducer,
    },
})

export const { studentAdded, studentUpdated, studentDeleted } =
    studentSlice.actions

export default studentSlice.reducer
