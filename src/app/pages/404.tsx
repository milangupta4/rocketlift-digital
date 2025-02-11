export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-2">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">Go back to Home</a>
    </div>
  );
} 