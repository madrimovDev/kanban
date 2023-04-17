import { PayloadAction, createSlice, isPending, isRejected } from '@reduxjs/toolkit'
import { Board } from '../types'
import { createBoard, deleteBoard, getBoards } from './boardActions'

interface State {
	loading: boolean
	error: boolean
	boards: Board[]
}

const initialState: State = {
	loading: false,
	error: false,
	boards: []
}

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
			state.loading = false
			state.error = false
			state.boards = action.payload
		})
		builder.addCase(createBoard.fulfilled, (state, action: PayloadAction<Board>) => {
			state.loading = false
			state.error = false
			state.boards.push(action.payload)
		})
		builder.addCase(deleteBoard.fulfilled, (state, action: PayloadAction<number>) => {
			state.loading = false
			state.error = false
			state.boards = state.boards.filter((b) => b.id !== action.payload)
		})
		builder.addMatcher(isPending(getBoards, createBoard, deleteBoard), (state) => {
			state.loading = true
			state.error = false
		})
		builder.addMatcher(isRejected(getBoards, createBoard, deleteBoard), (state) => {
			state.loading = false
			state.error = true
		})
	}
})

export const boardActions = boardSlice.actions
export const boardReducer = boardSlice.reducer
