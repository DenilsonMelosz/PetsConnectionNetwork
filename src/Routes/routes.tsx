import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../components/pages/auth/Login";
import { SignupPage } from "../components/pages/auth/Signup";
import { Dashboard } from "../components/pages/Dashboard";
import { PrivateRoute } from "./privateRoute";
import { Unauthorized } from "../components/pages/Unauthorized";



function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública para login */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/Dashboard" element={<Dashboard />} />


      

       {/* Rotas protegidas */}
      <Route
        path="/Dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      
      {/* Redireciona para não autorizado */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Redireciona para login por padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;