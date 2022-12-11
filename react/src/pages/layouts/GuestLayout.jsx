import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthProvider';

export default function GuestLayout() {
  const {token} = useAuthContext();

  if(token) {
    return <Navigate to='/dashboard' />
  }

  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
