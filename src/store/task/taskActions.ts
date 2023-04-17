import api from '@api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Task } from '../types'

export const getTasks = createAsyncThunk('tasks/getAll', async () => {
	const tasks = await api.get<Task[]>('/tasks')
	return tasks.data
})

export const setStatus = createAsyncThunk('tasks/setStatus', async (task: Task) => {
	const tasks = await api.put<Task>(`/tasks/${task.id}`, task)
	return tasks.data
})

export const createTask = createAsyncThunk(
	'tasks/create',
	async (data: { title: string; desc: string; statusId: number }) => {
		const task = await api.post<Task>('/tasks/', data)
		return task.data
	}
)

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
	await api.delete(`/tasks/${id}`)
	return id
})
