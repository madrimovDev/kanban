import React, { FormEvent, useRef } from 'react'
import { useDisclosure, useKeyDown, useOutsideClick } from '@hooks'
import { createColumn, useAppDispatch } from '@store'
import { AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

export const CreateColumn = () => {
	const { boardId } = useParams()
	const { onOpen, onClose, open } = useDisclosure()
	const dispatch = useAppDispatch()
	const formRef = useRef<HTMLFormElement>(null)

	useKeyDown('Escape', onClose)
	useOutsideClick(formRef, onClose)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries()) as { name: string; color: string }
		dispatch(
			createColumn({
				...data,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				boardId: +boardId!
			})
		)
		e.currentTarget.reset()
		onClose()
	}

	return (
		<div>
			<button
				onClick={onOpen}
				className='w-[250px] bg-sky-600/40 hover:bg-sky-600 active:scale-95 transition-all flex justify-center items-center p-3 text-2xl rounded-md shadow-md text-white'>
				<AiFillPlusCircle />
			</button>
			{open && (
				<div className='fixed inset-0 bg-black/50 backdrop-blur-sm grid place-items-center'>
					<button
						onClick={onClose}
						className='absolute top-10 right-10 text-2xl'>
						<AiOutlineClose />
					</button>

					<form
						ref={formRef}
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
			)}
		</div>
	)
}
