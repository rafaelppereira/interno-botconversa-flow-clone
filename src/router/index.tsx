/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HomePage } from '@/pages/home'
import { createBrowserRouter } from 'react-router-dom'


const router: any = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])

export { router }
