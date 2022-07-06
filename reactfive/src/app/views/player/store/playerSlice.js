import { createSlice } from '@reduxjs/toolkit'
import { fetchPlayer } from './player.action'
import { addPlayer } from './player.action'
import { editPlayer } from './player.action'
import { deletePlayer } from './player.action'

const fetchPlayerExtraReducer = {
    [fetchPlayer.pending]: (state, action) => {
        state.loading = true
    },
    [fetchPlayer.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchPlayer.rejected]: (state, action) => {
        state.loading = false
    },
}

const addPlayerExtraReducer = {
    [addPlayer.pending]: (state, action) => {
        state.loading = true
    },
    [addPlayer.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addPlayer.rejected]: (state, action) => {
        state.loading = false
    },
}

const editPlayerExtraReducer = {
    [editPlayer.pending]: (state, action) => {
        state.loading = true
    },
    [editPlayer.fulfilled]: (state, action) => {
        const { id, name, age, game, rating } = action.payload
        const existingPlayer = state.entities.find(
            (player) => player.id.toString() === id.toString()
        )
        if (existingPlayer) {
            existingPlayer.name = name
            existingPlayer.age = age
            existingPlayer.game = game
            existingPlayer.rating = rating
        }
        state.loading = false
    },
    [editPlayer.rejected]: (state, action) => {
        state.loading = false
    },
}

const deletePlayerExtraReducer = {
    [deletePlayer.pending]: (state, action) => {
        state.loading = true
    },
    [deletePlayer.fulfilled]: (state, action) => {
        const id = action.payload
        const existingPlayer = state.entities.find(
            (player) => player.id.toString() === id.toString()
        )
        if (existingPlayer) {
            state.entities = state.entities.filter((player) => player.id !== id)
        }
        state.loading = false
    },
    [deletePlayer.rejected]: (state, action) => {
        state.loading = false
    },
}
const playerSlice = createSlice({
    name: 'player',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        playerAdded(state, action) {
            state.entities.push(action.payload)
        },
        playerUpdated(state, action) {
            const { id, name, age, game, rating } = action.payload
            const existingPlayer = state.entities.find(
                (player) => player.id.toString() === id.toString()
            )
            if (existingPlayer) {
                existingPlayer.name = name
                existingPlayer.age = age
                existingPlayer.game = game
                existingPlayer.rating = rating
            }
        },
        playerDeleted(state, action) {
            const { id } = action.payload
            const existingPlayer = state.entities.find(
                (player) => player.id.toString() === id.toString()
            )
            if (existingPlayer) {
                state.entities = state.entities.filter(
                    (player) => player.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchPlayerExtraReducer,
        ...addPlayerExtraReducer,
        ...editPlayerExtraReducer,
        ...deletePlayerExtraReducer,
    },
})

export const { playerAdded, playerUpdated, playerDeleted } = playerSlice.actions

export default playerSlice.reducer
