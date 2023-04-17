import React, { DragEvent, FC, useEffect } from 'react'
import { deleteColumn, getTasks, setStatus, taskActions, useAppDispatch, useAppSelector } from '@store'
import { Status, Task as ITask } from 'src/store/types'
import { Task } from './Task'
import { CreateTask } from './CreateTask'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

export const Column: FC<{ column: Status }> = ({ column }) => {
	const tasks = useAppSelector((state) => {
		const _tasks = state.tasks.tasks
		return _tasks.filter((t) => t.statusId === column.id)
	})
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getTasks())
	}, [])

	const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
		const task = JSON.parse(e.dataTransfer.getData('task')) as ITask
		dispatch(taskActions.setStatus({ taskId: task.id, statusId: column.id }))
		dispatch(setStatus({ ...task, statusId: column.id }))
	}

	const handleDelete = () => {
		dispatch(deleteColumn(column.id))
	}

	return (
		<div
			onDrop={handleOnDrop}
			onDragOver={(e) => e.preventDefault()}
			className='w-[250px] h-fit rounded-md overflow-hidden bg-stone-100'>
			<div className={`p-3 ${column.color} flex items-center justify-between group`}>
				<h3>{column.name}</h3>
				<div>
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
			</div>
			<div className='p-4'>
				<CreateTask colId={column.id} />
				{tasks.map((task) => (
					<Task
						task={task}
						key={task.id}
					/>
				))}
			</div>
		</div>
	)
}
