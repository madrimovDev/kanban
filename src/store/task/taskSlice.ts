import { PayloadAction, createSlice, isPending, isRejected } from '@reduxjs/toolkit'
import { Status, Task } from '../types'
import { createTask, getTasks } from './taskActions'

interface State {
	loading: boolean
	error: boolean
	tasks: Task[]
}

const initialState: State = {
	loading: false,
	error: false,
	tasks: []
}

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		setStatus(state, action: PayloadAction<{ taskId: number; statusId: number }>) {
			state.tasks = state.tasks.map((t) => {
				if (t.id === action.payload.taskId) {
					return {
						...t,
						statusId: action.payload.statusId
					}
				}
				return t
			})
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
			state.loading = false
			state.error = false
			state.tasks = action.payload
		})
		builder.addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
			state.loading = false
			state.error = false
			state.tasks.push(action.payload)
		})
		builder.addMatcher(isPending(getTasks, createTask), (state) => {
			state.loading = true
			state.error = false
		})
		builder.addMatcher(isRejected(getTasks, createTask), (state) => {
			state.loading = false
			state.error = true
		})
	}
})

export const taskActions = taskSlice.actions
export const taskReducer = taskSlice.reducer
