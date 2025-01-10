import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const GuidePage = () => {
  const [response, setResponse] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    if (!response.trim()) {
      alert("Please enter a response.");
      return;
    }
    setLoading(true);
    try {
      // Simulating Google Assistant API
      const { data } = await axios.post("/api/extract-keywords", { text: response });
      setKeywords(data.keywords);
    } catch (error) {
      console.error("Error extracting keywords:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Guide Him/Her</h2>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Enter your response here..."
        className="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        onClick={handleExtract}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
      >
        Extract Keywords
      </button>
      {loading ? (
        <ClipLoader color="#4A5568" size={40} />
      ) : (
        <div className="w-full bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Extracted Keywords:</h3>
          {keywords.length > 0 ? (
            <ul className="list-disc pl-4">
              {keywords.map((keyword, index) => (
                <li key={index} className="text-gray-700">{keyword}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No keywords extracted yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GuidePage;
