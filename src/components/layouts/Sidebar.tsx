import React from 'react'
import classnames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '@store'
import { BsPlus } from 'react-icons/bs'

export const Sidebar = () => {
	const { boards } = useAppSelector((state) => state.board)
	const { pathname } = useLocation()
	return (
		<div className='h-full w-[200px] bg-stone-100 shadow-lg'>
			<ul className=''>
				{boards.map((board) => {
					return (
						<li key={board.id}>
							<Link
								className={classnames('px-4 py-2 block transition-all', {
									'bg-teal-600 text-white': pathname === '/' + board.id,
									'hover:bg-teal-600/50': pathname !== '/' + board.id
								})}
								to={board.id.toString()}>
								{board.name}
							</Link>
						</li>
					)
				})}
				<li>
					<button className='mt-4 flex items-center justify-center text-white font-semibold w-full px-4 p-2 text-center bg-gray-400'>
						<BsPlus />
					</button>
				</li>
			</ul>
		</div>
	)
}
