import api from '@api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Status } from '../types'

export const getColumns = createAsyncThunk('columns/getAll', async (id: number) => {
	const columns = await api.get<Status[]>(`/statuses?boardId=${id}`)
	return columns.data
})

export const createColumn = createAsyncThunk(
	'columns/create',
	async ({ name, color, boardId }: { name: string; color: string; boardId: number }) => {
		const columns = await api.post<Status>('/statuses', { name, color, boardId })
		return columns.data
	}
)

export const deleteColumn = createAsyncThunk('columns/delete', async (id: number) => {
	await api.delete(`/statuses/${id}`)
	return id
})
