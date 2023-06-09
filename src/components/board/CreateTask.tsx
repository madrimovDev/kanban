import React, { FormEvent, useRef } from 'react'
import { AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai'
import { useDisclosure, useKeyDown, useOutsideClick } from '@hooks'
import { createTask, useAppDispatch } from '@store'

export const CreateTask = ({ colId }: { colId: number }) => {
	const { open, onOpen, onClose } = useDisclosure()
	const dispatch = useAppDispatch()
	const formRef = useRef<HTMLFormElement>(null)

	useKeyDown('Escape', onClose)
	useOutsideClick(formRef, onClose)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries()) as { title: string; desc: string }
		dispatch(
			createTask({
				...data,
				statusId: colId
			})
		)
		e.currentTarget.reset()
		onClose()
	}

	return (
		<>
			<button
				onClick={onOpen}
				className='w-full flex items-center justify-center text-white bg-stone-200 p-1 rounded-sm shadow'>
				New task <AiFillPlusCircle />
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
							<label htmlFor='title'>Name</label>
							<input
								className='border outline-none p-2 rounded-sm'
								type='text'
								name='title'
								id='title'
							/>
						</div>
						<div className='flex flex-col gap-1'>
							<label htmlFor='desc'>Description</label>
							<textarea
								className='border outline-none  rounded-sm p-2'
								name='desc'
								id='desc'
							/>
						</div>
						<button className='w-full p-2 bg-sky-400 rounded-sm shadow-sm text-white'>CREATE</button>
					</form>
				</div>
			)}
		</>
	)
}
