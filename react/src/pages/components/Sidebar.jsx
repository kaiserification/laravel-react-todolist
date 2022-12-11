import React from "react";

import { NavLink } from "react-router-dom";

import { Home, File, Users } from 'react-feather'

export default function Sidebar() {
    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
            <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className='nav-link'>
                            <Home size={24} />
                            Tableau de bord <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/tasks' className='nav-link'>
                            <File size={24} />
                            Mes tâches
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to='/users' className='nav-link' >
                            <Users size={24} />
                            Comptes utilisateurs
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
