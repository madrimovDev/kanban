import React from 'react'

export default function Home() {
	return (
		<div className='w-full h-full grid place-items-center'>
			<div>
				<h1 className='text-4xl'>React Kanban</h1>
				<ol className='list-decimal list-inside space-y-3 mt-3'>
					<li className='text-xl'>Create Board</li>
					<li className='text-xl'>Create Column</li>
					<li className='text-xl'>Create Task</li>
				</ol>
			</div>
		</div>
	)
}
