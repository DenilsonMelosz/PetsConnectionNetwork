import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PrivateRoute } from '@/Routes/privateRoute';
import LoginPage  from '@/components/pages/auth/LoginPage';
import {RegisterPage} from "@/components/pages/auth/RegisterPage";
import TermosPage from "@/components/pages/TermosPage"
import PoliticasPage from "@/components/pages/PoliticasPage"
import EsqueciSenhaPage from "@/components/pages/EsqueciSenhaPage"
import LandingPage from "@/components/pages/LandingPage"
import SaibaMais from "@/components/pages/SaibaMais"
import ProfilePage from "@/components/pages/ProfilePage"
import FeedPage from "@/components/FeedPage"
import EventsPage from "@/components/EventsPage"
import ServicesPage from "@/components/ServicesPage"



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
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/servicos" element={<ServicesPage />} />




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