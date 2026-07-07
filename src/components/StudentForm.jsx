import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [cgpa, setCgpa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      name,
      department,
      cgpa: Number(cgpa),
      isActive: true,
    };

    onAddStudent(newStudent);

    setName("");
    setDepartment("");
    setCgpa("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" />
      <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
      <input value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="CGPA" type="number" step="0.01" />

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;