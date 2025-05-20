export default function JobMatchCard({ content }) {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">
        Suggested Job
      </h3>
      <p className="text-gray-600 whitespace-pre-line">{content}</p>
    </div>
  );
}
