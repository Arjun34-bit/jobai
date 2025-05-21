import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../constants/constants";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post(`${URL}/auth/register`, {
        ...form,
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErr(error);

      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {["name", "email", "password"].map((field) => (
          <input
            key={field}
            className="w-full p-2 mb-4 border rounded"
            placeholder={field}
            type={field === "password" ? "password" : "text"}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        {/* <select
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) =>
            setForm({ ...form, preferredJobType: e.target.value })
          }
        >
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="any">Any</option>
        </select> */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          {loading ? "Signing Up ....." : "Sign Up"}
        </button>

        <div className="flex justify-center items-center mt-2 gap-2">
          <span>Already Registered?</span>
          <span
            className="text-blue-400 text-underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}
