import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

const batchTypeStyles = {
  empty: "border-slate-200 bg-slate-50",
  small: "border-blue-200 bg-blue-50",
  large: "border-violet-200 bg-violet-50",
};

function Home({ students, batchMessage, batchType, onAddStudent, onDelete }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div
        className={`mb-6 rounded-xl border p-5 shadow-sm ${batchTypeStyles[batchType]}`}
      >
        <p className="text-sm text-slate-500">Batch Status</p>
        <h2 className="mt-2 text-2xl font-bold">{batchMessage}</h2>
      </div>

      <div className="mb-8">
        <StudentForm onAddStudent={onAddStudent} />
      </div>

      <StudentList students={students} onDelete={onDelete}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Student List</h2>

            <p className="text-sm text-slate-500">
              {students.length === 0
                ? "No records available"
                : students.length <= 5
                  ? "Showing a small batch of students"
                  : "Showing a large batch of students"}
            </p>
          </div>
        </div>
      </StudentList>
    </main>
  );
}

export default Home;
