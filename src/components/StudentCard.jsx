function StudentCard({ student, onDelete }) {
  return (
    <div className="card">
      <h3>{student.name}</h3>
      <p>Department: {student.department}</p>
      <p>CGPA: {student.cgpa}</p>

      <p>Status: {student.isActive ? "Active" : "Inactive"}</p>

      {student.isActive && <p>This student is currently active.</p>}

      <p>
        {(() => {
          return student.cgpa >= 3.5 ? "Good Result" : "Needs Improvement";
        })()}
      </p>

      <button onClick={() => onDelete(student.id)}>Delete</button>
    </div>
  );
}

export default StudentCard;