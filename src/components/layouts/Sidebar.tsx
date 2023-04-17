import React from 'react'
import classnames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { deleteBoard, useAppDispatch, useAppSelector } from '@store'
import { CreateBoard } from '../board/CreateBoard'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

export const Sidebar = () => {
	const { boards } = useAppSelector((state) => state.board)
	const { pathname } = useLocation()

	const dispatch = useAppDispatch()

	const handleDelete = (id: number) => {
		dispatch(deleteBoard(id))
	}

	return (
		<div className='h-full min-w-[200px] bg-stone-100 shadow-lg'>
			<ul className=''>
				{boards.map((board) => {
					return (
						<li
							className={classnames('px-4 py-2 block transition-all group flex justify-between items-center', {
								'bg-teal-600 text-white': pathname === '/' + board.id,
								'hover:bg-teal-600/50': pathname !== '/' + board.id
							})}
							key={board.id}>
							<Link
								className='hover:underline'
								to={board.id.toString()}>
								{board.name}
							</Link>

							<div className='space-x-2 opacity-0 group-hover:opacity-100'>
								<button className=' text-white hover:text-teal-500'>
									<AiFillEdit />
								</button>
								<button
									onClick={() => handleDelete(board.id)}
									className=' text-white hover:text-red-500'>
									<AiFillDelete />
								</button>
							</div>
						</li>
					)
				})}
				<li>
					<CreateBoard />
				</li>
			</ul>
		</div>
	)
}
