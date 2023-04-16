import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootProvider } from '@providers'
import './index.css'

const rootContainer = document.getElementById('root') as HTMLElement

const root = createRoot(rootContainer)

const app: JSX.Element = (
	<StrictMode>
		<RootProvider />
	</StrictMode>
)

root.render(app)
