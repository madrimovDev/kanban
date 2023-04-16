import { useMemo, useState } from 'react'

export const useDisclosure = () => {
	const [open, setOpen] = useState(false)

	const handlers = useMemo(() => {
		return {
			onOpen: () => setOpen(true),
			onClose: () => setOpen(false),
			onToggle: () => setOpen(!open)
		}
	}, [])

	return {
		open,
		...handlers
	}
}
