import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { NavItemInterface } from "../interfaces";
import { useAuth } from "../hooks";

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems: NavItemInterface[] = [
    { name: "Home", path: "/" },
    {
      name: "Account",
      path: "/auth/login",
      requiresAuth: false,
      dropdown: [
        { name: "Login", path: "/auth/login" },
        { name: "Register", path: "/auth/register" },
        { name: "Reset Password", path: "/auth/reset-password-request" },
      ],
    },
    {
      name: user?.name || "Account",
      path: "/",
      requiresAuth: true,
      dropdown: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Create a pet", path: "/create-pet" },
        { name: "Logout", path: "/auth/logout" },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with Image Above */}
      <header className="bg-blue-600 text-white p-4 relative">
        <img
          src="header-image.jpg"
          alt="Header Image"
          className="w-full h-32 object-cover"
        />
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-2xl font-bold">Midjits</h1>
        </div>

        {/* Floating Hamburger Menus for Mobile */}
        <div className="absolute top-4 right-4 flex space-x-4 md:hidden">
          {/* Main Navigation Hamburger */}
          <button
            onClick={() => setIsNavOpen(true)}
            className="focus:outline-none text-white bg-gray-800 rounded-full p-2"
          >
            ☰
          </button>

          {/* Sidebar Icon (Star for pet info) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="focus:outline-none text-white bg-gray-800 rounded-full p-2"
          >
            ★
          </button>
        </div>
      </header>

      {/* Secondary Header for Navigation (Desktop Only) */}
      <div className="hidden md:block bg-blue-500 text-white py-2 px-4">
        <nav className="flex justify-center space-x-8 relative">
          {navItems.map((item) => {
            if (item?.requiresAuth && !user) return null;
            if (item?.requiresAuth === false && user) return null;

            return (
              <div key={item.name} className="relative group">
                <Link to={item.path} className="hover:underline">
                  {item.name}
                </Link>

                {item.dropdown && (
                  <div className="absolute hidden group-hover:block bg-blue-600 text-white mt-1 rounded-md shadow-lg py-2 w-40">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 hover:bg-blue-700"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Navigation Slide-Over */}
      {isNavOpen && (
        <div className="fixed inset-0 bg-blue-600 bg-opacity-95 z-50 flex flex-col text-white p-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsNavOpen(false)}
              className="text-white text-xl font-bold focus:outline-none"
            >
              Close ✕
            </button>
          </div>
          <nav className="mt-10 space-y-4 text-center">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <button onClick={logout} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/auth/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Sidebar Slide-Over */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col text-gray-800 p-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-800 text-xl font-bold focus:outline-none"
            >
              Close ✕
            </button>
          </div>
          <aside className="mt-10 space-y-4 text-center">
            <h2 className="text-xl font-semibold">Your Pets</h2>
            <ul className="space-y-2">
              <li>Pet 1 Info</li>
              <li>Pet 2 Info</li>
              <li>Pet 3 Info</li>
            </ul>
          </aside>
        </div>
      )}

      {/* Main Content and Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar with Pet Info - Visible on Desktop */}
        <aside className="hidden md:block w-1/4 p-4 border-r border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Your Pets</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">Pet 1 Info</li>
            <li className="text-gray-700">Pet 2 Info</li>
            <li className="text-gray-700">Pet 3 Info</li>
          </ul>
        </aside>

        {/* Centered Main Content */}
        <main className="flex-1 p-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4">
        <p>© 2024 My Pet Game. All rights reserved.</p>
      </footer>
    </div>

    // <div className="flex flex-col min-h-screen">
    //   {/* Header */}
    //   <header className="bg-blue-600 text-white p-4">
    //     <div className="container mx-auto flex justify-between items-center">
    //       <h1 className="text-2xl font-bold">{title}</h1>
    //       <nav>
    //         <ul className="flex-space-x-4">
    //           <li>
    //             <Link to="/" className="hover:underline">
    //               Home
    //             </Link>
    //           </li>
    //           {user ? (
    //             <>
    //               <li>
    //                 <Link to="/dashboard" className="hover:underline">
    //                   Dashboard
    //                 </Link>
    //               </li>
    //               <li>
    //                 <button onClick={logout} className="hover:underline">
    //                   Logout
    //                 </button>
    //               </li>
    //             </>
    //           ) : (
    //             <>
    //               <li>
    //                 <Link to="/auth/login" className="hover:underline">
    //                   Login
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/auth/register" className="hover:underline">
    //                   Register
    //                 </Link>
    //               </li>
    //             </>
    //           )}
    //         </ul>
    //       </nav>
    //     </div>
    //   </header>

    //   {/* Main */}
    //   <main className="flex-grow container mx-auto mt-8 p-4">
    //     <Outlet />
    //   </main>

    //   {/* Footer */}
    //   <footer className="bg-gray-200 p-4 mt-8">
    //     <div className="container mx-auto text-center">
    //       <p>&copy; 2024 {title} | All rights reserved.</p>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default Layout;
