import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios-client";
import { useAuthContext } from "../contexts/AuthProvider";
import { getValidationErrors } from "../helpers";
import Alert from "./components/Alert";
import MainTitle from "./components/MainTitle";

function UpdateTaskForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification, user } = useAuthContext();
    const [form, setForm] = useState({});
    const [taskStatuses, setTaskStatuses] = useState([]);

    const onUpdateTask = (e) => {
        e.preventDefault();

        setLoading(true);

        axiosInstance.put('/tasks/' + id, form).then(({ data }) => {
            setNotification('La tâche a bien été modifiée.')
            return navigate('/tasks');
        }).catch(error => {
            setErrors(
                getValidationErrors(error)
            );
        }).finally(_ => {
            setLoading(false);
        })
    }

    useEffect(() => {
        axiosInstance.get('/users?skipPagination=1').then(({ data }) => {
            setAssignees(data);
        });

        axiosInstance.get('/taskStatuses').then(({ data }) => {
            setTaskStatuses(data);
        });

        axiosInstance.get('/tasks/' + id).then(({ data }) => {
            setForm(data);
        }).catch(error => {
            console.error(error);
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
                <MainTitle title={'modifier la tâche: ' + form.name} />
                <Link to="/tasks" className="btn btn-success btn-sm">
                    Retour
                </Link>
            </div>
            <div className="row">
                <div className="col-md-6">

                    {errors.length > 0 && <Alert errors={errors} />}

                    <form onSubmit={onUpdateTask}>
                        <div className="form-group">
                            <label htmlFor="name" className="control-label">
                                Titre
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="control-label">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                className="form-control"
                                value={form.description}
                                onChange={e => setForm({...form, description: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="assigned_to_id" className="control-label">
                                Assigner à
                            </label>
                            <select 
                                className="form-control" 
                                name="assigned_to_id" 
                                id="assigned_to_id"
                                value={form.assigned_to_id}
                                onChange={e => setForm({...form, assigned_to_id: e.target.value})}
                            >
                                <option value="">---</option>
                                {assignees.map(assignee => (
                                    <option key={assignee.id} value={assignee.id}>{user?.id == assignee.id ? 'Moi' : assignee.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="task_status_id" className="control-label">
                                Statut
                            </label>
                            <select 
                                className={'form-control ' + (errors.task_status_id ? 'is-invalid' : '')}
                                name="task_status_id" 
                                id="task_status_id"
                                value={form.task_status_id}
                                onChange={e => setForm({...form, task_status_id: e.target.value})}
                            >
                                <option value="">---</option>
                                {taskStatuses.map(taskStatus => (
                                    <option key={taskStatus.id} value={taskStatus.id}>{taskStatus.name}</option>
                                ))}
                            </select>
                            {errors.task_status_id && (
                                <span className="invalid-feedback">{errors.task_status_id}</span>
                            )}
                        </div>


                        <div className="form-group">
                            <label htmlFor="ends_at" className="control-label">
                                Date de fin
                            </label>
                            <input
                                type="date"
                                name="ends_at"
                                id="ends_at"
                                className="form-control"
                                value={form.ends_at}
                                onChange={e => setForm({...form, ends_at: e.target.value})}
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

export default UpdateTaskForm;
