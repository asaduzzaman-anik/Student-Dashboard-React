function ErrorFallback() {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <h3 className="text-lg font-semibold text-red-700">
        Something went wrong.
      </h3>
      <p className="mt-1 text-sm text-red-600">
        Please reload the application.
      </p>
    </div>
  );
}

export default ErrorFallback;