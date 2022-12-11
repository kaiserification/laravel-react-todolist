import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios-client";
import MainTitle from "./components/MainTitle";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("ALL");
    const [myTasks, setMyTasks] = useState('0');

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        axiosInstance.get("/tasks?status=" + status).then(({ data }) => {
            setTasks(data.data);
        });
    }, [status]);

    useEffect(() => {
      axiosInstance.get("/tasks?myTasks=" + myTasks).then(({ data }) => {
        setTasks(data.data);
      });
    }, [myTasks]);

    const getTasks = () => {
        setLoading(true);
        axiosInstance
            .get("/tasks")
            .then(({ data }) => {
                setTasks(data.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally((_) => {
                setLoading(false);
            });
    };

    const onDeleteTask = (e, id) => {
        e.preventDefault();
        if (!window.confirm("Sûr?")) {
            return;
        }

        axiosInstance
            .delete("/tasks/" + id)
            .then(() => {
                getTasks();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <MainTitle title="Liste des tâches" />
                <Link to="/tasks/new" className="btn btn-success btn-sm">
                    Ajouter une nouvelle tâche
                </Link>
            </div>

            <form>
                <div className="row d-flex align-items-end">

                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Mes taches / Toutes les taches</label>
                      <select name="myTasks" id="myTasks" className="form-control" value={myTasks} onChange={e => setMyTasks(e.target.value)}>
                        <option value="0">Toutes les tâches</option>
                        <option value="1">Mes tâches</option>
                      </select>
                    </div>
                  </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="status">Statut</label>
                            <select
                                name="status"
                                id="status"
                                className="form-control custom-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="ALL">Toutes les tâches</option>
                                <option value="TODO">À faire</option>
                                <option value="IN_PROGRESS">En cours</option>
                                <option value="DONE">Terminée</option>
                                <option value="BLOCKED">Bloquée</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Auteur</th>
                            <th>Assignée à</th>
                            <th>Statut</th>
                            <th>Date de fin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td className="text-center" colSpan={4}>
                                    Chargement...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td>{task.creator?.name || "---"}</td>
                                    <td>{task.assignee?.name || "---"}</td>
                                    <td>{task.task_status?.name || "---"}</td>
                                    <td>{task.formatted_ends_at}</td>
                                    <td
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <Link
                                            to={"/tasks/" + task.id + "/edit"}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Modifier
                                        </Link>
                                        <a
                                            href="#"
                                            onClick={(e) =>
                                                onDeleteTask(e, task.id)
                                            }
                                            className="btn btn-danger btn-sm"
                                        >
                                            Supprimer
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
