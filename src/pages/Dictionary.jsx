import React, { useState } from "react";

const dictionary = [
  { word: "Hello", video: "hello.mp4" },
  { word: "Thank You", video: "thankyou.mp4" },
  { word: "Yes", video: "yes.mp4" },
];

const Dictionary = () => {
  const [search, setSearch] = useState("");

  const filteredWords = dictionary.filter((entry) =>
    entry.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div class="min-h-screen bg-gray-100">
  <div class="container-max py-16">
    <h1 class="section-title">PSL Dictionary</h1>
    <input
      type="text"
      placeholder="Search for a word..."
      value="{search}"
      onChange="setSearch(event.target.value)"
      class="w-full p-3 rounded-md border border-gray-300 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-600"
    />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {filteredWords.map((entry, index) => (
        <div key={index} class="card">
          <h2 class="text-lg font-semibold mb-4">{entry.word}</h2>
          <video
            src={entry.video}
            controls
            class="rounded-lg w-full"
          ></video>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default Dictionary;
