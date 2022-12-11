import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios-client";
import { useAuthContext } from "../contexts/AuthProvider";
import MainTitle from "./components/MainTitle";
import Pagination from "./components/Pagination";

export default function Users() {
    const [search, setSearch] = useState('');
    const [users, setUsers]     = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification }   = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 0,
        current_page: 0,
        last_page: 0,
        from: 0,
        to: 0
    });

    function getUsers() {
        setLoading(true);
        axiosInstance.get('/users').then(({ data }) => {
            console.log(data)
            setUsers(data.data);
            setPagination(data.pagination);
        }).catch(error => {
            console.log(error);
        }).finally(_ => {
            setLoading(false);
        })
    }

    function onDelete(e, id) {
        e.preventDefault();

        if(! window.confirm('Sûr')) {
            return;
        }
        axiosInstance.delete('/users/' + id).then(() => {
            setNotification('Le compte a bien été supprimé.');
            getUsers();
        });
    }

    useEffect(() => {
        getUsers()
    }, []);

    function searchData(search) {
        axiosInstance.get('/users?search=' + search).then(({ data }) => {
            setUsers(data.data);
            setPagination(data.pagination);
        });
    }

    useEffect(() => {
        searchData(search);
    }, [search]);

    useEffect(() => {
        function fetchData() {
            axiosInstance.get('/users?page=' + currentPage).then(({ data }) => {
                setUsers(data.data);
                setPagination(data.pagination);
            })
        }
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <MainTitle title="Comptes utilisateurs" />
                <Link to='/users/new' className="btn btn-success btn-sm">Ajouter un compte</Link>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <label htmlFor="search" className="control-label">Recherche</label>
                            <input type="search" value={search} onChange={e => setSearch(e.target.value)} name="search" id="search" className="form-control"/>
                        </div>
                    </form>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom complet</th>
                            <th>Adresse email</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td className="text-center" colSpan={5}>Chargement...</td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <Link to={'/users/' + user.id + '/edit'} className="btn btn-primary btn-sm">
                                            Modifier
                                        </Link>

                                        <a href="#" onClick={e => onDelete(e, user.id)} className="btn btn-danger btn-sm">Supprimer</a>
                                    </td>
                                </tr>
                            )) 
                        }
                    </tbody>
                    )}
                </table>

                <Pagination
                    currentPage={currentPage}
                    total={pagination.total}
                    perPage={pagination.per_page}
                    lastPage={pagination.last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
