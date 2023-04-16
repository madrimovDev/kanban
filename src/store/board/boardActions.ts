import api from '@api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Board } from '../types'

export const getBoards = createAsyncThunk('boards/getAll', async () => {
	const boards = await api.get<Board[]>('/boards')
	return boards.data
})

export const createBoard = createAsyncThunk('boards/create', async (board: Board) => {
	const boards = await api.post<Board>('/boards', board)
	return boards.data
})
