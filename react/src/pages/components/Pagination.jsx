import { NavLink } from "react-router-dom";

export default function Pagination({ currentPage, total, perPage, lastPage, onPageChange }) {
    return (
        <nav ariaLabel="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><NavLink className="page-link" href="#" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Précédent</NavLink></li>
                <li className="page-item"><NavLink className="page-link" href="#" disabled={currentPage === lastPage} onClick={() => onPageChange(currentPage + 1)}>Suivant</NavLink></li>
            </ul>
        </nav>
    );
}