import React, { useEffect } from 'react'
import { getColumns, useAppDispatch, useAppSelector } from '@store'
import { useParams } from 'react-router-dom'
import { Column, CreateColumn } from '@components'

export default function Board() {
	const { boardId } = useParams()
	const columns = useAppSelector((state) => state.column)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getColumns(+boardId!))
		console.log('render')
	}, [boardId])

	return (
		<div className='px-10 pt-5 gap-4 h-full overflow-auto'>
			<div className='flex w-fit h-full gap-4'>
				{columns.statuses.map((col) => (
					<Column
						column={col}
						key={col.id}
					/>
				))}
				<CreateColumn />
			</div>
		</div>
	)
}
