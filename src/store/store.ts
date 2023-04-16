import { configureStore } from '@reduxjs/toolkit'
import { boardReducer } from './board/boardSlice'
import { columnReducer } from './column/columnSlice'
import { taskReducer } from './task/taskSlice'

const store = configureStore({
	reducer: {
		board: boardReducer,
		column: columnReducer,
		tasks: taskReducer
	},
	devTools: !import.meta.env.PROD
})

export default store
