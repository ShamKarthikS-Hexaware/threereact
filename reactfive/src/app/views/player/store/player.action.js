import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'app/services/notification/store/notification.actions'
import axios from '../../../../axios'

const endPoint = 'player'

export const fetchPlayer = createAsyncThunk('player/fetchPlayer', async () => {
    const response = await axios.get(`/${endPoint}`)
    const player = await response.data
    return player
})

export const addPlayer = createAsyncThunk(
    'player/addPlayer',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const player = await response.data
        thunkAPI.dispatch(showSuccess('Player added successfully'))
        return player
    }
)

export const editPlayer = createAsyncThunk(
    'player/editPlayer',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const player = await response.data
        thunkAPI.dispatch(showSuccess('Player updated successfully'))
        return player
    }
)

export const deletePlayer = createAsyncThunk(
    'player/deletePlayer',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected player deleted successfully.')
            )
            return data.id
        }
    }
)
