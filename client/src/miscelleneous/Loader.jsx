import React from "react";

export default function LoadingSuggest() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex space-x-2 mb-4">
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
      </div>
      <p className="text-sm text-gray-600 text-center">
        Predicting and suggesting job matches using{" "}
        <span className="font-semibold text-indigo-700">OpenAI</span>...
      </p>
    </div>
  );
}
