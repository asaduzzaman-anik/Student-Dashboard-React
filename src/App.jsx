import { Component, useMemo, useState } from 'react'
import './App.css'

const initialStudents = [
  {
    id: 1,
    name: 'Rahim',
    department: 'CSE',
    cgpa: 3.75,
    isActive: true,
  },
  {
    id: 2,
    name: 'Karim',
    department: 'EEE',
    cgpa: 3.42,
    isActive: false,
  },
  {
    id: 3,
    name: 'Nusrat',
    department: 'BBA',
    cgpa: 3.91,
    isActive: true,
  },
]

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary" role="alert">
          <h2>Something went wrong.</h2>
          <p>Please reload the application.</p>
        </section>
      )
    }

    return this.props.children
  }
}

function Navbar({ totalStudents }) {
  return (
    <header className="navbar">
      <h1>Student Dashboard</h1>
      <p>Total Students: {totalStudents}</p>
    </header>
  )
}

function BatchSummary({ totalStudents }) {
  let ifElseMessage

  if (totalStudents === 0) {
    ifElseMessage = 'No Students Found'
  } else if (totalStudents === 1) {
    ifElseMessage = 'Small Batch'
  } else {
    ifElseMessage = 'Large Batch'
  }

  let switchMessage

  switch (true) {
    case totalStudents === 0:
      switchMessage = 'No Students Found'
      break
    case totalStudents === 1:
      switchMessage = 'Small Batch'
      break
    default:
      switchMessage = 'Large Batch'
  }

  const ternaryMessage =
    totalStudents === 0
      ? 'No Students Found'
      : totalStudents === 1
        ? 'Small Batch'
        : 'Large Batch'

  return (
    <section className="summary" aria-label="Batch summary">
      <article>
        <span>If...else</span>
        <strong>{ifElseMessage}</strong>
      </article>
      <article>
        <span>Switch</span>
        <strong>{switchMessage}</strong>
      </article>
      <article>
        <span>Ternary</span>
        <strong>{ternaryMessage}</strong>
      </article>
    </section>
  )
}

function AddStudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    cgpa: '',
  })
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedName = formData.name.trim()
    const trimmedDepartment = formData.department.trim()
    const cgpa = Number(formData.cgpa)

    if (!trimmedName || !trimmedDepartment || !formData.cgpa) {
      setError('Please fill in all fields before adding a student.')
      return
    }

    if (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 4) {
      setError('CGPA must be a number between 0 and 4.')
      return
    }

    onAddStudent({
      name: trimmedName,
      department: trimmedDepartment,
      cgpa,
      isActive: true,
    })

    setFormData({
      name: '',
      department: '',
      cgpa: '',
    })
    setError('')
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Student Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
        />
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <input
          id="department"
          name="department"
          type="text"
          value={formData.department}
          onChange={handleChange}
          placeholder="CSE"
        />
      </div>

      <div>
        <label htmlFor="cgpa">CGPA</label>
        <input
          id="cgpa"
          name="cgpa"
          type="number"
          min="0"
          max="4"
          step="0.01"
          value={formData.cgpa}
          onChange={handleChange}
          placeholder="3.75"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Add Student</button>
    </form>
  )
}

function StudentCard({ student, onDeleteStudent, shouldCrash }) {
  if (shouldCrash) {
    throw new Error('Intentional StudentCard crash')
  }

  const { id, name, department, cgpa, isActive } = student

  return (
    <article className="student-card">
      <div className="card-header">
        <h3>{name}</h3>
        <span className={isActive ? 'status active' : 'status inactive'}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {isActive && <p className="active-note">Currently enrolled</p>}

      {(() => {
        const gradeLabel = cgpa >= 3.75 ? 'Excellent' : cgpa >= 3 ? 'Good' : 'Needs Support'

        return <p className="grade-label">{gradeLabel}</p>
      })()}

      <dl>
        <div>
          <dt>Department</dt>
          <dd>{department}</dd>
        </div>
        <div>
          <dt>CGPA</dt>
          <dd>{cgpa.toFixed(2)}</dd>
        </div>
      </dl>

      <button type="button" className="delete-button" onClick={() => onDeleteStudent(id)}>
        Delete
      </button>
    </article>
  )
}

function StudentList({ children }) {
  return <section className="student-list">{children}</section>
}

function App() {
  const [students, setStudents] = useState(initialStudents)
  const [crashCardId, setCrashCardId] = useState(null)

  const totalStudents = students.length
  const highestCgpa = useMemo(() => {
    if (students.length === 0) {
      return '0.00'
    }

    return Math.max(...students.map((student) => student.cgpa)).toFixed(2)
  }, [students])

  function handleAddStudent(newStudent) {
    setStudents((currentStudents) => [
      ...currentStudents,
      {
        ...newStudent,
        id: Date.now(),
      },
    ])
  }

  function handleDeleteStudent(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    )
  }

  return (
    <main className="dashboard">
      <Navbar totalStudents={totalStudents} />

      <section className="overview" aria-label="Dashboard overview">
        <article>
          <span>Active</span>
          <strong>{students.filter((student) => student.isActive).length}</strong>
        </article>
        <article>
          <span>Inactive</span>
          <strong>{students.filter((student) => !student.isActive).length}</strong>
        </article>
        <article>
          <span>Highest CGPA</span>
          <strong>{highestCgpa}</strong>
        </article>
      </section>

      <BatchSummary totalStudents={totalStudents} />

      <section className="workspace">
        <AddStudentForm onAddStudent={handleAddStudent} />

        <ErrorBoundary>
          <div className="list-heading">
            <div>
              <h2>Students</h2>
              <p>{totalStudents === 0 ? 'No Students Found' : 'Manage current student records'}</p>
            </div>
            {students.length > 0 && (
              <button
                type="button"
                className="crash-button"
                onClick={() => setCrashCardId(students[0].id)}
              >
                Crash First Card
              </button>
            )}
          </div>

          {students.length === 0 ? (
            <p className="empty-message">No Students Found</p>
          ) : (
            <StudentList>
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onDeleteStudent={handleDeleteStudent}
                  shouldCrash={crashCardId === student.id}
                />
              ))}
            </StudentList>
          )}
        </ErrorBoundary>
      </section>
    </main>
  )
}

export default App
