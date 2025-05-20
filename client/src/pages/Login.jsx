import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
          Login
        </button>
        <div className="flex justify-center items-center mt-2 gap-2">
          <span>new to JOBAI</span>
          <span
            className="text-blue-400 text-underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}
