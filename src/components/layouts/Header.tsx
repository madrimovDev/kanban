import React from 'react'
import { AiFillLayout } from 'react-icons/ai'
export const Header = () => {
	return (
		<div className='px-10 py-4 bg-stone-100 shadow-lg shadow-stone-200/50'>
			<h2 className='text-xl font-semibold flex items-center gap-2 cursor-pointer'>
				<AiFillLayout className='text-teal-400' />
				Kanban
			</h2>
		</div>
	)
}
