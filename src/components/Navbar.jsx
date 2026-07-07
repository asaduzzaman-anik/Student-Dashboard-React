function Navbar({ totalStudents }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-900">
          Student Dashboard
        </h1>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Total Students: {totalStudents}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
