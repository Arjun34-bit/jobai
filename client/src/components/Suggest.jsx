import React, { useEffect, useState } from "react";
import { JobState } from "../StoreContext/Providers";
import { allRoles, allSkills, NominatimURL, URL } from "../constants/constants";
import axios from "axios";

export default function Suggest() {
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [roleSuggestions, setRoleSuggestions] = useState([]);
  const [skillSuggestions, setSkillSuggestions] = useState([]);

  const { user, setSugg, err, setErr, setSuggLoading } = JobState();

  const handleSuggest = async () => {
    try {
      setSuggLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.post(
        `${URL}/job/getRecommendations`,
        { location, role: role, skills: skills.split(","), experience },
        config
      );
      setSuggLoading(false);

      setSugg(JSON.parse(res?.data?.data?.matches));
      localStorage.setItem("jobs", JSON.stringify(res?.data?.data?.matches));
      localStorage.setItem(
        "payloads",
        JSON.stringify({
          location: location,
          role: role,
          skills: skills,
          experience: experience,
        })
      );
    } catch (error) {
      setSuggLoading(false);
      setErr(error);

      console.log(err);
    }
  };

  useEffect(() => {
    const getData = setTimeout(async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const locData = await axios.get(`${URL}/misc?q=${location}`, config);
      setLocationSuggestions(locData?.data);
    }, 1000);

    return () => clearTimeout(getData);
  }, [location]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
    setRoleSuggestions(allRoles.filter((r) => r.toLowerCase()));
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSkills(value);
    const lastSkill = value.split(",").pop().trim();
    setSkillSuggestions(
      allSkills.filter((skill) =>
        skill.toLowerCase().includes(lastSkill.toLowerCase())
      )
    );
  };

  const selectLocation = (loc) => {
    setLocation(loc);
    setLocationSuggestions([]);
  };

  const selectRole = (role) => {
    setRole(role);
    setRoleSuggestions([]);
  };

  const selectSkill = (skill) => {
    let existing = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!existing.includes(skill)) {
      existing.push(skill);
    }
    setSkills(existing.join(", "));
    setSkillSuggestions([]);
  };

  const handlePrevious = () => {
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    setSugg(JSON.parse(jobs));

    const payloads = JSON.parse(localStorage.getItem("payloads"));
    setLocation(payloads?.location);
    setRole(payloads?.role);
    setSkills(payloads?.skills);
    setExperience(payloads?.experience);
  };

  const handleClear = () => {
    setLocation("");
    setRole("");
    setSkills("");
    setExperience("");

    setSugg("");
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
        {/* Location Input */}
        <div className="relative w-60">
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {locationSuggestions
            ? locationSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-40 overflow-auto">
                  {locationSuggestions.map((loc, i) => (
                    <li
                      key={i}
                      onClick={() => selectLocation(loc?.display_name)}
                      className="text-sm hover:bg-indigo-100 cursor-pointer"
                    >
                      {loc?.display_name}
                    </li>
                  ))}
                </ul>
              )
            : ""}
        </div>

        {/* JobRole Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={role}
            onChange={handleRoleChange}
            placeholder="Job Role"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {roleSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow max-h-40 overflow-auto">
              {roleSuggestions.map((ro, i) => (
                <li
                  key={i}
                  onClick={() => selectRole(ro)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {ro}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Skills Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={skills}
            onChange={handleSkillChange}
            placeholder="Skills (comma-separated)"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {skillSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow max-h-40 overflow-auto">
              {skillSuggestions.map((skill, i) => (
                <li
                  key={i}
                  onClick={() => selectSkill(skill)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Experience Input */}
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Years of Experience"
          className="w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Suggest Button */}
        <button
          onClick={handleSuggest}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-small rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Find My Matches
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <div
          className="ml-3 mt-3 bg-blue-300 border-2 border-blue-600 rounded rounded-lg p-1 w-fit text-sm font-semibold cursor-pointer"
          onClick={handlePrevious}
        >
          use previous preference
        </div>
        <div
          className="ml-3 mt-3 bg-red-300 border-2 border-red-600 rounded rounded-lg p-1 w-fit text-sm font-semibold cursor-pointer"
          onClick={handleClear}
        >
          <span className="text-red-800">X</span> Clear
        </div>
      </div>
    </div>
  );
}
