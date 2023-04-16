import React, { DragEvent, FC } from 'react'
import type { Task as ITask } from 'src/store/types'

export const Task: FC<{ task: ITask }> = ({ task }) => {
	const handleOnDrag = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('task', JSON.stringify(task))
	}

	return (
		<div
			draggable
			onDragStart={handleOnDrag}
			className='bg-stone-50 my-4 shadow rounded'>
			<h4 className='p-2 bg-sky-400 text-white'>{task.title}</h4>
			<p className='p-2'>{task.desc}</p>
		</div>
	)
}
