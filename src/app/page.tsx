import ProtectedRoute from "./protected-route";

export default function Page() {
  return (
    <ProtectedRoute>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your Next.js App Router project!</p>
    </ProtectedRoute>
  );
}
