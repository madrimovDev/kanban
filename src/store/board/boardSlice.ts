import { PayloadAction, createSlice, isPending, isRejected } from '@reduxjs/toolkit'
import { Board } from '../types'
import { createBoard, getBoards } from './boardActions'

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
		builder.addMatcher(isPending(getBoards, createBoard), (state) => {
			state.loading = true
			state.error = false
		})
		builder.addMatcher(isRejected(getBoards, createBoard), (state) => {
			state.loading = false
			state.error = true
		})
	}
})

export const boardActions = boardSlice.actions
export const boardReducer = boardSlice.reducer
