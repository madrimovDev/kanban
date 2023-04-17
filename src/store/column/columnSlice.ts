import { PayloadAction, createSlice, isPending, isRejected } from '@reduxjs/toolkit'
import { Status } from '../types'
import { createColumn, deleteColumn, getColumns } from './columnActions'

interface State {
	loading: boolean
	error: boolean
	statuses: Status[]
}

const initialState: State = {
	loading: false,
	error: false,
	statuses: []
}

const columnSlice = createSlice({
	name: 'columns',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getColumns.fulfilled, (state, action: PayloadAction<Status[]>) => {
			state.loading = false
			state.error = false
			state.statuses = action.payload
		})
		builder.addCase(createColumn.fulfilled, (state, action: PayloadAction<Status>) => {
			state.loading = false
			state.error = false
			state.statuses.push(action.payload)
		})
		builder.addCase(deleteColumn.fulfilled, (state, action: PayloadAction<number>) => {
			state.loading = false
			state.error = false
			state.statuses = state.statuses.filter((s) => s.id !== action.payload)
		})
		builder.addMatcher(isPending(getColumns, createColumn, deleteColumn), (state) => {
			state.loading = true
			state.error = false
		})
		builder.addMatcher(isRejected(getColumns, createColumn, deleteColumn), (state) => {
			state.loading = false
			state.error = true
		})
	}
})

export const columnAction = columnSlice.actions
export const columnReducer = columnSlice.reducer
