import React, { DragEvent, FC, useEffect } from 'react'
import { getTasks, setStatus, taskActions, useAppDispatch, useAppSelector } from '@store'
import { Status, Task as ITask } from 'src/store/types'
import { Task } from './Task'
import { CreateTask } from './CreateTask'

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

	return (
		<div
			onDrop={handleOnDrop}
			onDragOver={(e) => e.preventDefault()}
			className='w-[250px] h-fit rounded-md overflow-hidden bg-stone-100'>
			<h3 className={`p-3 ${column.color}`}>{column.name}</h3>
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
