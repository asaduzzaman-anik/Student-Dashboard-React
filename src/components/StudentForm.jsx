import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    cgpa: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const department = formData.department.trim();
    const cgpa = formData.cgpa.trim();

    if (!name || !department || !cgpa) {
      setError("Please fill in all fields before adding a student.");
      return;
    }

    if (Number(cgpa) < 0 || Number(cgpa) > 4) {
      setError("CGPA must be between 0 and 4.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      department,
      cgpa: Number(cgpa),
      isActive: true,
    };

    onAddStudent(newStudent);

    setFormData({
      name: "",
      department: "",
      cgpa: "",
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-slate-900">
        Add New Student
      </h2>
      <p className="mb-5 text-sm text-slate-500">
        Fill in the student information carefully.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Student Name"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="number"
          name="cgpa"
          value={formData.cgpa}
          onChange={handleChange}
          placeholder="CGPA"
          step="0.01"
          min="0"
          max="4"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-500"
        />

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 cursor-pointer"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;