import { Navigate } from "react-router-dom";
import { AuthProvider} from "./AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = AuthProvider
    console.log(user);
    

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection (optional)
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
