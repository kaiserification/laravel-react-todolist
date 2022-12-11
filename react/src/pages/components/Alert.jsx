export default function Alert({ errors }) {
    return (
        <div className="alert alert-danger">
            {errors.map((error, index) => (
                <div key={index}>{error}</div>
            ))}
        </div>
    )
}