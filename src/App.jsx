import { useState } from "react";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import AlertBanner from "./components/AlertBanner";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { initialStudents } from "./data/students";

function App() {
  const [students, setStudents] = useState(initialStudents);

  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    student: null,
  });

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);

    setAlert({
      message: `${student.name} has been added successfully.`,
      type: "success",
    });

    setTimeout(() => {
      setAlert({
        message: "",
        type: "success",
      });
    }, 3000);
  };

  const deleteStudent = (id, name) => {
    setDeleteModal({
      open: true,
      student: {
        id,
        name,
      },
    });
  };

  const confirmDeleteStudent = () => {
    setStudents((prev) =>
      prev.filter((student) => student.id !== deleteModal.student.id),
    );

    setAlert({
      message: `${deleteModal.student.name} has been deleted successfully.`,
      type: "success",
    });

    setDeleteModal({
      open: false,
      student: null,
    });

    setTimeout(() => {
      setAlert({
        message: "",
        type: "success",
      });
    }, 3000);
  };

  const cancelDelete = () => {
    setDeleteModal({
      open: false,
      student: null,
    });
  };

  // if...else
  let batchMessage;

  if (students.length === 0) {
    batchMessage = "No Students Found";
  } else if (students.length <= 5) {
    batchMessage = "Small Batch";
  } else {
    batchMessage = "Large Batch";
  }

  // switch statement
  const getBatchMessageBySwitch = () => {
    switch (true) {
      case students.length === 0:
        return "No Students Found";
      case students.length <= 5:
        return "Small Batch";
      default:
        return "Large Batch";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar totalStudents={students.length} />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <AlertBanner
          message={alert.message}
          type={alert.type}
          onClose={() =>
            setAlert({
              message: "",
              type: "success",
            })
          }
        />

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Students</p>

            <h2 className="mt-2 text-3xl font-bold">{students.length}</h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Batch Status</p>

            <h2 className="mt-2 text-2xl font-bold">{batchMessage}</h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Switch Result</p>

            <h2 className="mt-2 text-2xl font-bold">
              {getBatchMessageBySwitch()}
            </h2>
          </div>
        </div>

        <div className="mb-8">
          <StudentForm onAddStudent={addStudent} />
        </div>

        <StudentList students={students} onDelete={deleteStudent}>
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

      <DeleteConfirmModal
        isOpen={deleteModal.open}
        studentName={deleteModal.student?.name}
        onCancel={cancelDelete}
        onConfirm={confirmDeleteStudent}
      />
    </div>
  );
}

export default App;
