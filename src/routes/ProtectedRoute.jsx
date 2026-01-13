import { Login } from "../pages/Login/Login";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const accessToken=localStorage.getItem("accessToken")
  const user=useSelector(state=>state.auth.user);
  const role=useSelector(state=>state.auth.role)
  console.log("ProtectedRoute auth:", isAuthenticated,accessToken,user,role);

  return isAuthenticated ? children : <Login/>;
}



// import { Navigate } from "react-router-dom";
// import { Login } from "../pages/Login/Login";
// export default function ProtectedRoute({ children }) {
//   const role = !!localStorage.getItem("role");
//   return role? children : ;
// }
