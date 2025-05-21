export default function JobMatchCard({ idx, content, src, layout = "grid" }) {
  if (!content) return null;

  const isList = layout === "list";

  return (
    <div
      key={idx}
      className={`${
        isList ? "bg-blue-300" : "bg-white"
      } p-4 shadow rounded-md border border-gray-200 hover:shadow-lg transition duration-200 
        `}
    >
      <div className="flex-1">
        <h3 className="text-base font-semibold text-indigo-700 mb-2">
          {src === "vert"
            ? content.company
            : content.job_title || "Job Title Not Provided"}
        </h3>

        <p
          className={`${
            isList ? "text-white-500" : "text-black"
          } text-sm flex items-center mb-1`}
        >
          📍 <span className="ml-1">{content.location || "Not specified"}</span>
        </p>

        <p className="text-sm text-gray-700 flex items-center mb-1">
          💼{" "}
          <span className="ml-1">
            {src === "vert" ? content.title : content.role || "Not specified"}
          </span>
        </p>

        <p className="text-sm text-gray-700 flex items-center mb-1">
          🕒{" "}
          <span className="ml-1">
            {content.required_experience || "Not specified"}
          </span>
        </p>

        <p className="text-sm text-gray-700 flex items-center mb-3">
          💰{" "}
          <span className="ml-1">
            {src === "vert"
              ? content.salary_range
              : content.salary || "Not disclosed"}
          </span>
        </p>
      </div>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={`${
          isList ? "bg-green-400" : "bg-indigo-600"
        } block text-center mt-2 text-sm px-3 py-1 text-white rounded hover:bg-indigo-700 transition text-decoration-none`}
      >
        Apply Now
      </a>
    </div>
  );
}
