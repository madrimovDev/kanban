import { useDisclosure } from '@hooks'
import { createColumn, useAppDispatch } from '@store'
import classNames from 'classnames'
import React, { FormEvent } from 'react'
import { AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

export const CreateColumn = () => {
	const { boardId } = useParams()
	const { onOpen, onClose, open } = useDisclosure()
	const dispatch = useAppDispatch()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries()) as { name: string; color: string }
		dispatch(
			createColumn({
				...data,
				boardId: +boardId!
			})
		)
	}

	return (
		<div>
			<button
				onClick={onOpen}
				className='w-[250px] bg-sky-600/40 hover:bg-sky-600 active:scale-95 transition-all flex justify-center items-center p-3 text-2xl rounded-md shadow-md text-white'>
				<AiFillPlusCircle />
			</button>
			<div
				className={classNames('fixed inset-0 bg-black/50 backdrop-blur-sm grid place-items-center', {
					hidden: !open
				})}>
				<button
					onClick={onClose}
					className='absolute top-10 right-10 text-2xl'>
					<AiOutlineClose />
				</button>

				<form
					onSubmit={handleSubmit}
					className='p-4 bg-white rounded-md shadow-md space-y-4'>
					<div className='flex flex-col gap-1'>
						<label htmlFor='name'>Name</label>
						<input
							className='border outline-none p-2 rounded-sm'
							type='text'
							name='name'
							id='name'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='color'>Color</label>
						<select
							name='color'
							id='color'>
							<option
								value='bg-teal-400'
								className='bg-teal-400'>
								Teal
							</option>
							<option
								value='bg-red-400'
								className='bg-red-400'>
								Red
							</option>
							<option
								value='bg-sky-400'
								className='bg-sky-400'>
								Sky
							</option>
						</select>
					</div>
					<button className='w-full p-2 bg-sky-400 rounded-sm shadow-sm text-white'>CREATE</button>
				</form>
			</div>
		</div>
	)
}
