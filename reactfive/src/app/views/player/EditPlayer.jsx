import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editPlayer } from './store/player.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditPlayer = () => {
    const { id: playerId } = useParams()

    const player = useSelector((state) =>
        state.player.entities.find(
            (player) => player.id.toString() === playerId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(player.name)
    const [age, setAge] = useState(player.age)
    const [game, setGame] = useState(player.game)
    const [rating, setRating] = useState(player.rating)

    const handleName = (e) => setName(e.target.value)
    const handleAge = (e) => setAge(parseInt(e.target.value))
    const handleGame = (e) => setGame(e.target.value)
    const handleRating = (e) => setRating(parseFloat(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editPlayer({
                id: playerId,
                name,
                age,
                game,
                rating,
            })
        )
        navigate('/player')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditPlayer', path: '/player' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age || ''}
                                validators={['required']}
                                label="Age"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="game"
                                id="gameInput"
                                onChange={handleGame}
                                value={game}
                                validators={['required']}
                                label="Game"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="rating"
                                id="ratingInput"
                                onChange={handleRating}
                                value={rating || ''}
                                validators={['required']}
                                label="Rating"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditPlayer
