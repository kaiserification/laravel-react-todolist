import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios-client";
import { useAuthContext } from "../contexts/AuthProvider";
import { getErrors } from "../helpers";
import Alert from "./components/Alert";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState([]);
    const { setUser, setToken } = useAuthContext();

    const onRegister = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosInstance
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                const errors = getErrors(error);
                setErrors(errors);
            });
    };
    return (
        <div>
            <div className="auth-form">
                <div className="card-body">
                    <h1>Créer un compte</h1>

                    <form onSubmit={onRegister}>
                        <div className="form-group">
                            <label htmlFor="name">Nom complet</label>
                            <input
                                type="text"
                                id="name"
                                ref={nameRef}
                                placeholder="Nom complet"
                                className={'form-control ' + (errors.name ? 'is-invalid' : '')}
                            />
                            {errors.name && (
                              <span className="invalid-feedback">{errors.name}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Adresse email</label>
                            <input
                                type="email"
                                id="email"
                                ref={emailRef}
                                className={'form-control ' + (errors.email ? 'is-invalid' : '')}
                                placeholder="Adresse email"
                            />
                            {errors.email && (
                              <span className="invalid-feedback">{errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                ref={passwordRef}
                                className={'form-control ' + (errors.password ? 'is-invalid' : '')}
                                placeholder="Mot de passe"
                            />
                            {errors.password && (
                              <span className="invalid-feedback">{errors.password}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password-confirm">
                                Répétez le mot de passe
                            </label>
                            <input
                                type="password"
                                id="password-confirm"
                                ref={passwordConfirmationRef}
                                className="form-control"
                                placeholder="Répétez le mot de passe"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Créer un compte
                        </button>

                        <p className="mt-4 text-right">
                            Vous avez déjà un compte ? -{" "}
                            <Link to="/login">Se connecter</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
