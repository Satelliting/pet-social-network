import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";
import { ActivePetProvider } from "./providers/ActivePetProvider";
import Layout from "./components/Layout";
import AuthPage from "./pages/Auth/AuthPage";
import Login from "./pages/Auth/components/Login";
import Register from "./pages/Auth/components/Register";
import Home from "./components/Home";
import ResetPasswordRequest from "./pages/Auth/components/ResetPasswordRequest";
import ResetPassword from "./pages/Auth/components/ResetPassword";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ActivePetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Main */}
              <Route index element={<Home />} />
              {/* Auth */}
              {/* This will get removed once we setup the custom domain stuff */}
              <Route
                path="/reset-password"
                element={<Navigate to="/auth/reset-password" replace />}
              />
              <Route path="auth/" element={<AuthPage />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                  path="reset-password-request"
                  element={<ResetPasswordRequest />}
                />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
              {/* Misc */}
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </ActivePetProvider>
    </AuthProvider>
  );
};

export default App;
