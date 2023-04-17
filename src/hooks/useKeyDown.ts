import { useEffect } from 'react'

export const useKeyDown = (key: string, handle: () => void) => {
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.code === key) {
				handle()
			}
		}

		window.addEventListener('keydown', listener)

		return () => {
			window.removeEventListener('keydown', listener)
		}
	}, [])
}
