function Student({ student }) {
    return (
        <div>
            <h2>{student.name}</h2>
            <p>{student.email}</p>
            <p>{student.course}</p>
        </div>
    );
}

export default Student;