import { useState } from "react";
import axios from "axios";
import JobMatchCard from "../components/JobMatchCard";
import Suggest from "../components/Suggest";

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFindMatches = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/jobs/recommend",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMatches(res.data.matches.split("\n").filter(Boolean));
    setLoading(false);
  };

  return (
    <>
      <div className="width-full h-12 bg-blue-600 flex justify-between items-center px-3">
        <div className="text-xl font-semibold text-white">JOBAI</div>
        <div className="flex justify-between items-center gap-3 text-white">
          <span>Profile</span>
          <span>Logout</span>
        </div>
      </div>
      <Suggest />
      <div className="p-10 min-h-screen bg-gray-100">
        <button
          onClick={handleFindMatches}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Finding Matches..." : "Find My Matches"}
        </button>
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, index) => (
            <JobMatchCard key={index} content={match} />
          ))}
        </div>
      </div>
    </>
  );
}
