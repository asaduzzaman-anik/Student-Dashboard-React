function StudentCard({ student, onDelete }) {
  if (!student.name) {
    throw new Error("Student name is missing");
  }

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {student.name}
            </h3>
            <p className="text-sm text-slate-500">{student.department}</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              student.isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {student.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-800">CGPA:</span>{" "}
            {student.cgpa}
          </p>

          {student.isActive && (
            <p className="text-emerald-600">Currently enrolled student</p>
          )}

          <p>
            {(() => {
              if (student.cgpa >= 3.5) return "Excellent academic performance";
              if (student.cgpa >= 3) return "Good academic performance";
              return "Needs academic improvement";
            })()}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(student.id, student.name)}
        className="mt-5 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 cursor-pointer"
      >
        Delete Student
      </button>
    </div>
  );
}

export default StudentCard;
