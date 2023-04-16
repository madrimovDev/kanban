import React from 'react'
import { RootLayout } from '@components'
import { createBrowserRouter } from 'react-router-dom'
import { Board, Home } from '@pages'

const rootRouter = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: ':boardId',
				element: <Board />
			}
		]
	}
])

export default rootRouter
