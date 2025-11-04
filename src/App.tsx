import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PrivateRoute } from '@/Routes/privateRoute';
import LoginPage  from '@/components/pages/auth/LoginPage';
import {RegisterPage} from "@/components/pages/auth/RegisterPage";
import TermosPage from "@/components/pages/TermosPage"
import PoliticasPage from "@/components/pages/PoliticasPage"
import EsqueciSenhaPage from "@/components/pages/EsqueciSenhaPage"
import LandingPage from "@/components/pages/LandingPage"
import SaibaMais from "@/components/pages/SaibaMais"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
        <Route path="/saibamais" element={<SaibaMais />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/politicas" element={<PoliticasPage />} />


        {/* <Route
          path="/home"
          element={
            <PrivateRoute>
              <dashboa />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
