import store from 'app/redux/store'
import { playerAdded, playerDeleted, playerUpdated } from '../playerSlice'

describe('testing player redux store reducers', () => {
    test('add player to store test', () => {
        let state = store.getState().player
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            age: 45,
            game: 'game',
            rating: 91.07,
        }
        store.dispatch(playerAdded(initialInput))
        state = store.getState().player
        expect(state.entities).toHaveLength(1)
    })

    test('update player from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            age: 40,
            game: 'game',
            rating: 7.99,
        }
        store.dispatch(playerAdded(initialInput))
        let state = store.getState().player
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            age: 66,
            game: 'game1',
            rating: 83.65,
        }
        store.dispatch(playerUpdated(updatedInput))
        state = store.getState().player
        let changedPlayer = state.entities.find((p) => p.id === 2)
        expect(changedPlayer).toStrictEqual(updatedInput)
    })

    test('delete player from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            age: 82,
            game: 'game',
            rating: 83.96,
        }
        store.dispatch(playerAdded(initialInput))
        let state = store.getState().player
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            playerDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().player
        expect(state.entities).toHaveLength(2)
    })
})
