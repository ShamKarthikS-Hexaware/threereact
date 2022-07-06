import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'app/services/notification/store/notification.actions'
import axios from '../../../../axios'

const endPoint = 'student'

export const fetchStudent = createAsyncThunk(
    'student/fetchStudent',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const student = await response.data
        return student
    }
)

export const addStudent = createAsyncThunk(
    'student/addStudent',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const student = await response.data
        thunkAPI.dispatch(showSuccess('Student added successfully'))
        return student
    }
)

export const editStudent = createAsyncThunk(
    'student/editStudent',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const student = await response.data
        thunkAPI.dispatch(showSuccess('Student updated successfully'))
        return student
    }
)

export const deleteStudent = createAsyncThunk(
    'student/deleteStudent',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected student deleted successfully.')
            )
            return data.id
        }
    }
)
