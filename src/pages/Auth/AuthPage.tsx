import { Outlet } from "react-router-dom";

const AuthPage: React.FC = () => {
  return (
    <div className="auth-layout">
      <header>
        <h1>Authentication</h1>
      </header>

      <Outlet />
    </div>
  );
};

export default AuthPage;
