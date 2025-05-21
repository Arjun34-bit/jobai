import { useState } from "react";
import axios from "axios";
import JobMatchCard from "../components/JobMatchCard";
import Suggest from "../components/Suggest";
import { JobState } from "../StoreContext/Providers";
import LoadingSuggest from "../miscelleneous/Loader";
import { useNavigate } from "react-router-dom";

import { CAvatar } from "@coreui/react";
import JobList from "../components/JobList";

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user, sugg, setSuggLoading, suggLoading } = JobState();

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

  const handleLogout = () => {
    localStorage.setItem("userInfo", null);
    navigate("/login");
  };

  return (
    <>
      <div className="width-full h-12 bg-blue-600 flex justify-between items-center px-3">
        <div className="text-xl font-semibold text-white">JOBAI</div>
        <div className="flex justify-between items-center gap-3 text-white">
          <div className="flex items-center gap-2">
            <CAvatar color="secondary" textColor="white">
              {user?.name[0]}
            </CAvatar>
            <span>{user?.name}</span>
          </div>
          <span
            className="cursor-pointer border-1 border-white p-[2px] text-sm rounded rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
      </div>
      <Suggest />
      {suggLoading ? (
        <LoadingSuggest />
      ) : Array.isArray(sugg) && sugg.length > 0 ? (
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sugg.map((match, index) => (
            <JobMatchCard
              key={index}
              idx={index}
              content={match}
              layout={"grid"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No job suggestions.
        </div>
      )}
      <div className="mt-5 p-3">
        <JobList />
      </div>
    </>
  );
}
