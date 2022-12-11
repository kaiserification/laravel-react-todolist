import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios-client';
import { useAuthContext } from '../../contexts/AuthProvider';

export default function Navbar() {
  const [_user, _setUser] = useState({});
  const { setUser, setToken } = useAuthContext();

  useEffect(() => {
    axiosInstance.get('/user').then(({ data }) => {
      _setUser(data);
    });
  }, []);

  const onLogout = (e) => {
    e.preventDefault();

    axiosInstance.post('/logout').then(() => {
      console.log('test')
      setToken(null);
    });
  }

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to="/dashboard" className="navbar-brand col-md-3 col-lg-2 mr-0 px-3">Task Manager</Link>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#" onClick={onLogout}>Déconnexion</a>
          </li>
        </ul>
    </nav>
  )
}
