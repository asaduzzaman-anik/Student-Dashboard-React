import StudentCard from "./StudentCard";

function StudentList({ students, onDelete, children }) {
  return (
    <div>
      {children}

      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default StudentList;