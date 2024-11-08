import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Layout: React.FC = () => {
  const title = "Midjits";
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <nav>
            <ul className="flex-space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="hover:underline">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/auth/login" className="hover:underline">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/register" className="hover:underline">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto mt-8 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 {title} | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
