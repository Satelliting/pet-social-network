import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const title = "Pet Social Network";
  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 text-white rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-extrabold mb-4">
        Welcome to the
        <br />
        <span className="text-yellow-300">{title}</span>
      </h2>
      <p className="text-lg mb-6">
        This is the home page. Please{" "}
        <span className="font-semibold">login</span> or{" "}
        <span className="font-semibold">register</span> to access the dashboard.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 font-bold py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md hover:bg-yellow-300 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
