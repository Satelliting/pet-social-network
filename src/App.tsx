import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Main */}
            <Route index element={<Home />} />
            {/* User */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="reset-password-request"
              element={<ResetPasswordRequest />}
            />
            <Route path="reset-password" element={<ResetPassword />} />
            {/* Misc */}
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
