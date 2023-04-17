import { useDisclosure, useKeyDown, useOutsideClick } from '@hooks'
import { createBoard, useAppDispatch } from '@store'
import React, { FormEvent, useRef } from 'react'
import { AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai'

export const CreateBoard = () => {
	const { onClose, onOpen, open } = useDisclosure()
	const formRef = useRef<HTMLFormElement>(null)
	const dispatch = useAppDispatch()

	useKeyDown('Escape', onClose)
	useOutsideClick(formRef, onClose)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries()) as { name: string }

		dispatch(createBoard(data.name))
		e.currentTarget.reset()
		onClose()
	}

	return (
		<div>
			<button
				onClick={onOpen}
				className='w-full flex items-center justify-center p-2 bg-stone-300 text-green-600 mt-2'>
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
						onSubmit={handleSubmit}
						ref={formRef}
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
						<button className='w-full p-2 bg-sky-400 rounded-sm shadow-sm text-white'>CREATE</button>
					</form>
				</div>
			)}
		</div>
	)
}
