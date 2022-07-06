import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'app/redux/store'
import {
    fetchPlayer,
    addPlayer,
    editPlayer,
    deletePlayer,
} from '../player.action'

const getPlayerListResponse = [
    {
        id: 1,
        name: 'name',
        age: 94,
        game: 'game',
        rating: 66.02,
    },
]

const addPlayerListResponse = (data) => {
    return { id: 2, ...data }
}
const editPlayerListResponse = (data) => {
    return data
}

describe('should test Player redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'player'
    test('Should be able to fetch the player list and update player redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getPlayerListResponse)
        const result = await store.dispatch(fetchPlayer())
        const playerList = result.payload
        expect(result.type).toBe('player/fetchPlayer/fulfilled')
        expect(playerList).toEqual(getPlayerListResponse)

        const state = store.getState().player
        expect(state.entities).toEqual(playerList)
    })

    test('Should be able to add new player to list and make post api and update player redux store', async () => {
        const body = {
            name: 'name',
            age: 34,
            game: 'game',
            rating: 89.49,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addPlayerListResponse(body)
        )
        const result = await store.dispatch(addPlayer(body))
        const playerItem = result.payload
        expect(result.type).toBe('player/addPlayer/fulfilled')
        expect(playerItem).toEqual(addPlayerListResponse(body))

        const state = store.getState().player
        expect(state.entities).toContainEqual(addPlayerListResponse(body))
    })

    test('Should be able to edit player in list and make put api call and update player redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            age: 47,
            game: 'game',
            rating: 11.39,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editPlayerListResponse(body)
        )
        const result = await store.dispatch(editPlayer(body))
        const playerItem = result.payload
        expect(result.type).toBe('player/editPlayer/fulfilled')
        expect(playerItem).toEqual(editPlayerListResponse(body))

        const state = store.getState().player
        let changedPlayer = state.entities.find((p) => p.id === body.id)
        expect(changedPlayer.name).toEqual(body.name)
    })

    test('Should be able to delete player in list and update player redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().player
        const initialLength = state.entities.length
        const result = await store.dispatch(deletePlayer(input))
        const deletId = result.payload
        expect(result.type).toBe('player/deletePlayer/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().player
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
