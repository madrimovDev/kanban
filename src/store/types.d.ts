import store from './store'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Task {
	id: number
	title: string
	desc: string
	statusId: number
}

export interface Status {
	id: number
	name: string
	color: string
	boardId: number
}

export interface Board {
	id: number
	name: string
	isActive: boolean
}
