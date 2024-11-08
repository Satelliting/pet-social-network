import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";
import { ActivePetProvider } from "./providers/ActivePetProvider";
import Layout from "./components/Layout";

import { HomePage, AuthPage, CreatePetPage, DashboardPage } from "./pages";

import {
  Login,
  Register,
  ResetPasswordRequest,
  ResetPassword,
} from "./pages/Auth/components";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ActivePetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Main */}
              <Route index element={<HomePage />} />
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
              <Route path="create-pet" element={<CreatePetPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>
          </Routes>
        </Router>
      </ActivePetProvider>
    </AuthProvider>
  );
};

export default App;
