import { RefObject, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handle: () => void) => {
	useEffect(() => {
		const listener = (e: Event) => {
			if (!ref.current || ref.current.contains(e.target as Node)) {
				return
			}
			handle()
		}

		window.addEventListener('mousedown', listener)
		window.addEventListener('touchstart', listener)

		return () => {
			window.removeEventListener('mousedown', listener)
			window.removeEventListener('touchstart', listener)
		}
	}, [])
}
