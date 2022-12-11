import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthProvider'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function AdminLayout() {
  const { token, notification } = useAuthContext();

  if(! token) {
    return <Navigate to='/login' />
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            {notification && (
              <div className='alert alert-success mt-4 animated fadeInDown'>
                {notification}
              </div>
            )}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
