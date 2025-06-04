import { Navigate } from "react-router";
import { useUser } from "../contexts/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loadingUser } = useUser();

  if (loadingUser) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
