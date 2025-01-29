import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='w-full max-w-[860px] mx-auto'>
      <Outlet />
    </div>
  )
}
