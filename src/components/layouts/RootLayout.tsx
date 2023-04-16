import React, { FC, PropsWithChildren, useEffect } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { getBoards, useAppDispatch } from '@store'
import { Outlet } from 'react-router-dom'

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getBoards())
	}, [])
	return (
		<div className='flex flex-col bg-stone-50 text-stone-800 h-screen overflow-hidden'>
			<Header />
			<div className='h-full flex overflow-hidden'>
				<Sidebar />
				<Outlet />
			</div>
		</div>
	)
}
