import React, { useState, useEffect } from "react";
import axios from "axios";
import JobMatchCard from "./JobMatchCard";
import { URL } from "../constants/constants";
import { JobState } from "../StoreContext/Providers";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = JobState();

  const fetchJobs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(`${URL}/job/?page=${page}&limit=5`, config);
      const newJobs = res.data.jobs;

      setJobs((prev) => [...prev, ...newJobs]);
      setHasMore(page < res.data.totalPages);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="p-6 flex flex-col gap-6">
      {jobs.map((job, idx) => (
        <JobMatchCard key={idx} content={job} layout="list" />
      ))}

      {!hasMore && <p className="text-center text-gray-500">No more jobs.</p>}
    </div>
  );
};

export default JobList;
