import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  });

  const [suggLoading, setSuggLoading] = useState(false);
  const [sugg, setSugg] = useState(() => {
    const jobsInfo = localStorage.getItem("jobs");
    return jobsInfo ? JSON.parse(jobsInfo) : null;
  });
  const [err, setErr] = useState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <JobContext.Provider
      value={{
        user,
        setUser,
        sugg,
        setSugg,
        err,
        setErr,
        suggLoading,
        setSuggLoading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const JobState = () => useContext(JobContext);
export default Provider;
