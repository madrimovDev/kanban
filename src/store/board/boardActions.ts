import api from '@api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Board } from '../types'

export const getBoards = createAsyncThunk('boards/getAll', async () => {
	const boards = await api.get<Board[]>('/boards')
	return boards.data
})

export const createBoard = createAsyncThunk('boards/create', async (name: string) => {
	const boards = await api.post<Board>('/boards', {
		name,
		isActive: true
	})
	return boards.data
})

export const deleteBoard = createAsyncThunk('boards/delete', async (id: number) => {
	await api.delete(`/boards/${id}`)
	return id
})
