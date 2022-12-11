import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios-client";
import { useAuthContext } from "../contexts/AuthProvider";
import { getValidationErrors } from "../helpers";
import Alert from "./components/Alert";
import MainTitle from "./components/MainTitle";

export default function EditUserForm() {
    const { setNotification } = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [editingUser, setEditingUser] = useState({});

    useEffect(() => {
        axiosInstance.get('/users/' + id).then(({ data }) => {
            setEditingUser(data);
            setForm(data);
        }).catch(error => {
            console.error(error);
        })
    }, []);

    const onUpdateUser = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosInstance.put('/users/' + id, form).then(({ data }) => {
            setNotification('Le compte a bien été modifié.')
            return navigate('/users');
        }).catch(error => {
            const errors = getValidationErrors(error);
            setErrors(errors);
        }).finally(_ => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <MainTitle title={'Modifier le compte: ' + form.name} />
                <Link to="/users" className="btn btn-success btn-sm">
                    Retour
                </Link>
            </div>


            <div className="row">
                <div className="col-md-6">
                    {errors.length > 0 && <Alert errors={errors} />}

                    <form onSubmit={onUpdateUser}>
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={'form-control ' + (errors.name ? 'is-invalid' : '')}
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value })}
                            />
                            {errors.name && (
                                <span className="invalid-feedback">{errors.name}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="control-label">
                                Adresse email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={'form-control ' + (errors.email ? 'is-invalid' : '')}
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                            />
                            {errors.email && (
                                <span className="invalid-feedback">{errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="control-label">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={'form-control ' + (errors.password ? 'is-invalid' : '')}
                                onChange={e => setForm({...form, password: e.target.value})}
                            />
                            {errors.password && (
                                <span className="invalid-feedback">{errors.password}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="password-confirm"
                                className="control-label"
                            >
                                Répétez le mot de passe
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                id="password-confirm"
                                className="form-control"
                                onChange={e => setForm({...form, password_confirmation: e.target.value})}
                            />
                        </div>

                        <button disabled={loading} type="submit" className="btn btn-primary">
                            Enregistrer les modifications
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
