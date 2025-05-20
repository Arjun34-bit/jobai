import React, { useState } from "react";

const allLocations = [
  "Mumbai, Maharashtra",
  "Pune, Maharashtra",
  "Delhi, Maharashtra",
  "Bangalore, Maharashtra",
  "Chennai, Maharashtra",
  "Hyderabad, Maharashtra",
];
const allSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Python",
  "CSS",
  "Tailwind",
  "Express",
];

export default function Suggest({ onSuggest }) {
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [skillSuggestions, setSkillSuggestions] = useState([]);

  const handleSuggest = () => {
    onSuggest({ location, skills: skills.split(","), experience });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setLocationSuggestions(
      allLocations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      )
    );
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
          {locationSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow max-h-40 overflow-auto">
              {locationSuggestions.map((loc, i) => (
                <li
                  key={i}
                  onClick={() => selectLocation(loc)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {loc}
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
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Suggest
        </button>
      </div>
    </div>
  );
}
