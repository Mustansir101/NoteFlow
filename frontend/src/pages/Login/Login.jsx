import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError(null);

    // login API call Integration
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleDemoLogin = async () => {
    setEmail("John@gmail.com");
    setPassword("123456");
    Login();
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-24">
        <div>
          <div className="w-96 border border-gray-400 rounded-2xl bg-white px-7 py-10">
            <form onSubmit={handleSubmit}>
              <h4 className="text-2xl mb-7">Login</h4>
              <input
                type="email"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              <button
                type="submit"
                className="btn-primary"
                onClick={handleSubmit}
              >
                Login
              </button>

              <p className="text-sm text-center mt-4">
                Not Registered Yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#2B85FF] underline"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>

          <div className="bg-yellow-50 mt-2 border-l-4 max-w-96 border-yellow-400 p-3 mb-4 text-sm text-gray-800 rounded">
            <p className="mb-1">
              ⚠️ <strong>Note:</strong> The backend is hosted on a free service.
              Initial spin-up may take up to 45 seconds. Till then Logging in might show unexpected error.
            </p>
            <p>
              💡 <strong>Demo Login:</strong> Email: John@gmail.com {" "}
              | Password: 123456
            </p>
            <button
              onClick={() => handleDemoLogin()}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
            >
              Login as Demo User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
