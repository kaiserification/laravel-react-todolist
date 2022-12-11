import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios-client";
import { useAuthContext } from "../contexts/AuthProvider";
import { getErrors } from "../helpers.js";
import Alert from "./components/Alert";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState([]);
    const { setUser, setToken } = useAuthContext();
    const onLogin = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosInstance
            .post("/login", payload)
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
                    <h1>Se connecter</h1>
                    <form onSubmit={onLogin}>
                        {errors.length > 0 && <Alert errors={errors} />}

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
                                <span className="invalid-feedback">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                ref={passwordRef}
                                className={'form-control ' + (errors.email ? 'is-invalid' : '')}
                                placeholder="Mot de passe"
                            />
                            {errors.password && (
                                <span className="invalid-feedback">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Se connecter
                        </button>
                        <p className="mt-4 text-right">
                            Pas encore de compte -{" "}
                            <Link to="/register">Créer un compte</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
