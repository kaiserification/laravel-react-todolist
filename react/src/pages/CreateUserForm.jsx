import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios-client";
import { useAuthContext } from "../contexts/AuthProvider";
import { getErrors } from "../helpers";
import Alert from "./components/Alert";
import MainTitle from "./components/MainTitle";

export default function CreateUserForm() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const {setNotification} = useAuthContext();

    const onCreateUser = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosInstance.post('/users', payload).then(({ data }) => {
            setNotification('Le compte a bien été créé.')
            return navigate('/users');
        }).catch(error => {
            const errors = getErrors(error);
            setErrors(errors);
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
                <MainTitle title="Ajouter un compte" />
                <Link to="/users" className="btn btn-success btn-sm">
                    Retour
                </Link>
            </div>

            <div className="row">
                <div className="col-md-6">

                    <form onSubmit={onCreateUser}>
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className={'form-control ' + (errors.name ? 'is-invalid' : '')}
                                ref={nameRef}
                            />
                            {errors.name && (<span className="invalid-feedback">{errors.name}</span>)}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="control-label">
                                Adresse email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={emailRef}
                                className={'form-control ' + (errors.email ? 'is-invalid' : '')}
                            />
                            {errors.email && (<span className="invalid-feedback">{errors.email}</span>)}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="control-label">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className={'form-control ' + (errors.password ? 'is-invalid' : '')}
                                ref={passwordRef}
                            />
                            {errors.password && (<span className="invalid-feedback">{errors.password}</span>)}
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
                                ref={passwordConfirmationRef}
                            />
                        </div>

                        <button disabled={loading} type="submit" className="btn btn-primary">
                            Enregistrer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
