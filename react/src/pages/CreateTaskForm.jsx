import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios-client";
import { useAuthContext } from "../contexts/AuthProvider";
import { getErrors } from "../helpers";
import Alert from "./components/Alert";
import MainTitle from "./components/MainTitle";

export default function CreateTaskForm() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const assignedToIdRef = useRef();
    const endsAtRef = useRef();

    const [errors, setErrors] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useAuthContext();

    const onCreateTask = (e) => {
        e.preventDefault();

        setLoading(true);

        const payload = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            assigned_to_id: assignedToIdRef.current.value,
            ends_at: endsAtRef.current.value,
        };

        console.log(assignedToIdRef.current.value);

        axiosInstance
            .post("/tasks", payload)
            .then(({ data }) => {
                setNotification("La tache a bien été créée.");
                return navigate("/tasks");
            })
            .catch((error) => {
                const errors = getErrors(error);
                setErrors(errors);
            })
            .finally((_) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        axiosInstance.get("/users?noPaging=1").then(({ data }) => {
            setAssignees(data.data);
        });
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <MainTitle title="Nouvelle tache" />
                <Link to="/tasks" className="btn btn-success btn-sm">
                    Retour
                </Link>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onCreateTask}>
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">
                                Titre
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className={
                                    "form-control " +
                                    (errors.name ? "is-invalid" : "")
                                }
                                ref={nameRef}
                            />
                            {errors.name && (
                                <span className="invalid-feedback">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="description"
                                className="control-label"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                className={
                                    "form-control " +
                                    (errors.description ? "is-invalid" : "")
                                }
                                ref={descriptionRef}
                            />
                            {errors.description && (
                                <span className="invalid-feedback">
                                    {errors.description}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="assigned_to_id"
                                className="control-label"
                            >
                                Assigner à
                            </label>
                            <select
                                ref={assignedToIdRef}
                                className="form-control"
                                className={'form-control ' + (errors.assigned_to_id ? 'is-invalid' : '')}
                                name="assigned_to_id"
                                id="assigned_to_id"
                            >
                                <option value="">---</option>
                                {assignees.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            {errors.assigned_to_id && (
                                <span className="invalid-feedback">
                                    {errors.assigned_to_id}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="name" className="control-label">
                                Date de fin
                            </label>
                            <input
                                type="date"
                                name="ends_at"
                                id="ends_at"
                                className={
                                    "form-control " +
                                    (errors.ends_at ? "is-invalid" : "")
                                }
                                ref={endsAtRef}
                            />
                            {errors.ends_at && (
                                <span className="invalid-feedback">
                                    {errors.ends_at}
                                </span>
                            )}
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Enregistrer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
