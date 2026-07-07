import StudentCard from "./StudentCard";
import ErrorBoundary from "./ErrorBoundary";

function StudentList({ students, onDelete, children }) {
  return (
    <section>
      {children}

      {students.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-800">
            No Students Found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Add a new student using the form above.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <ErrorBoundary key={student.id}>
              <StudentCard student={student} onDelete={onDelete} />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </section>
  );
}

export default StudentList;