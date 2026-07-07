import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
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

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert({ message: "", type: "success" });
    }, 3000);
  };

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
    showAlert(`${student.name} has been added successfully.`);
  };

  const deleteStudent = (id, name) => {
    setDeleteModal({
      open: true,
      student: { id, name },
    });
  };

  const confirmDeleteStudent = () => {
    setStudents((prev) =>
      prev.filter((student) => student.id !== deleteModal.student.id),
    );

    showAlert(`${deleteModal.student.name} has been deleted successfully.`);

    setDeleteModal({
      open: false,
      student: null,
    });
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
  let batchType;

  switch (true) {
    case students.length === 0:
      batchType = "empty";
      break;
    case students.length <= 5:
      batchType = "small";
      break;
    default:
      batchType = "large";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar totalStudents={students.length} />

      <AlertBanner
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "success" })}
      />

      <Home
        students={students}
        batchMessage={batchMessage}
        batchType={batchType}
        onAddStudent={addStudent}
        onDelete={deleteStudent}
      />

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
