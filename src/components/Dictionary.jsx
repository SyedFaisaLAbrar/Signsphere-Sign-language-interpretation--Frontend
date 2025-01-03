import React, { useState } from "react";

// Dynamically import all videos from the dictionary folder
const videos = require.context("../assets/dictionary", false, /\.(mp4)$/);

const Dictionary = () => {
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState({}); // Track playing state of videos

  // Get the video file paths and names
  const videoFiles = videos.keys().map((key) => ({
    name: key.replace("./", "").replace(".mp4", "").replace(/_/g, " "),
    path: videos(key),
  }));

  // Filter videos based on search
  const filteredVideos = videoFiles.filter((video) =>
    video.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePlay = (index) => {
    const videoElement = document.getElementById(`video-${index}`);
    if (videoElement) {
      videoElement.play();
      setPlaying((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleEnd = (index) => {
    setPlaying((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold text-center mb-8">PSL Dictionary</h1>
        <input
          type="text"
          placeholder="Search for an action..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <div key={index} className="relative group">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <video
                  id={`video-${index}`}
                  src={video.path}
                  className="w-full h-full rounded-lg"
                  muted
                  onEnded={() => handleEnd(index)}
                ></video>
                {!playing[index] && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 group-hover:bg-opacity-30 transition"
                    onClick={() => handlePlay(index)}
                  >
                    <div className="p-4 bg-white rounded-full shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-purple-600"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <h2 className="text-lg font-semibold text-center mt-4 capitalize">
                {video.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
