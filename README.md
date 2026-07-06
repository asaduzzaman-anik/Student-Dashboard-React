# Student Dashboard

A React + Vite assignment project that demonstrates components, JSX, props, events, forms, conditional rendering, component composition, state management, lifting state up, and error boundaries.

## Features

- Dynamic navbar with total student count
- Reusable `StudentCard` component rendered with `students.map`
- Student props for name, department, CGPA, and active status
- Conditional rendering with ternary operator, logical `&&`, IIFE, `if...else`, and `switch`
- Controlled add-student form with validation and `preventDefault`
- Delete event for removing a student from the list
- Component composition with `App`, `Navbar`, `StudentList`, and `StudentCard`
- State stored in `App` and passed down through props
- Error boundary fallback for an intentional `StudentCard` crash

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```text
src/
  App.jsx
  App.css
  index.css
  main.jsx
```
