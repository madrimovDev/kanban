import { deleteTask, useAppDispatch } from '@store'
import React, { DragEvent, FC } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import type { Task as ITask } from 'src/store/types'

export const Task: FC<{ task: ITask }> = ({ task }) => {
	const dispatch = useAppDispatch()
	const handleOnDrag = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('task', JSON.stringify(task))
	}

	const handleDelete = () => {
		dispatch(deleteTask(task.id))
	}

	return (
		<div
			draggable
			onDragStart={handleOnDrag}
			className='bg-stone-50 my-4 shadow rounded'>
			<div className='p-2 bg-sky-400 flex justify-between items-center group '>
				<h4 className=' text-white'>{task.title}</h4>
				<div className='space-x-2 opacity-0 group-hover:opacity-100'>
					<button className=' text-white hover:text-teal-500'>
						<AiFillEdit />
					</button>
					<button
						onClick={handleDelete}
						className=' text-white hover:text-red-500'>
						<AiFillDelete />
					</button>
				</div>
			</div>
			<p className='p-2'>{task.desc}</p>
		</div>
	)
}
