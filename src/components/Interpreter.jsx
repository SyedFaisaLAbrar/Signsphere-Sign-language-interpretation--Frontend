import React, { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";
import './interpreter.css';
import backgroundImage from '../assets/inter_background2.png';


const Interpreter = () => {
  const [translation, setTranslation] = useState("Translation will appear here.");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [gottranslation, setgottranslation] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null); // For uploaded video
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [isGuideButtonEnabled, setIsGuideButtonEnabled] = useState(false);
  const webcamRef = useRef(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      setUploadedVideo(acceptedFiles[0]);
      setIsWebcamOn(false); // Turn off webcam
    }
  };

  const handleDeleteUploadedVideo = () => {
    setUploadedVideo(null); // Reset the uploaded video
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    onDrop: handleDrop,
  });

  const handleRecord = () => {
    setCountdown(3);
    setIsWebcamOn(true);
    setIsRecording(false);

    let timer = 3;
    const countdownInterval = setInterval(() => {
      timer--;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        startRecording();
      }
    }, 1000);
  };

  const startRecording = () => {
    setIsRecording(true);
    const stream = webcamRef.current.stream;
    const videoStream = new MediaStream(stream.getVideoTracks());
    const mediaRecorder = new MediaRecorder(videoStream);
    const videoChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      videoChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: "video/mp4" });
      setRecordedVideo(videoBlob);
      setIsRecording(false);
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 9000); // Record for 9 seconds
  };

  const processVideo = async (videoFile) => {
    if (!videoFile) return;
  
    setLoading(true); // Start loader
    setTranslation(""); // Clear previous translation
    const formData = new FormData();
    formData.append("file", videoFile, videoFile.name || "recorded-video.mp4");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/process_video", {
        method: "POST",
        body: formData,
      });
  
      setTranslation("Processing...");
  
      if (response.ok) {
        const result = await response.json();
        setgottranslation(true)
        setTranslation(result.action || "Translation could not be processed.");
        setIsGuideButtonEnabled(true);
      } else {
        setTranslation("Error processing video. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setTranslation("Error processing video. Please try again.");
    } finally {
      setLoading(false); // Stop loader
    }
  };
  
  const handleProcessRecordedVideo = () => processVideo(recordedVideo);
  
  const handleProcessUploadedVideo = () => processVideo(uploadedVideo);
  
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen glassy-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="px-6 py-10 grid grid-cols-4 gap-12">
        {/* Recording Section */}
        <div className="bg-white bg-opacity-30 col-span-2 p-6 rounded-xl shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-thin text-white mb-4">Record</h2>
          <div className="relative w-full h-80 bg-gray-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden shadow-xl">
            {countdown !== null && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-6xl font-bold">
                {countdown}
              </div>
            )}
            <Webcam
              audio={false}
              ref={webcamRef}
              className="rounded-lg w-full h-full object-cover"
              videoConstraints={{
                width: 1280,
                height: 720,
                aspectRatio: 16 / 9,
              }}
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleRecord}
              disabled={isRecording}
              className={`w-1/2 py-3 rounded-full shadow-lg transform transition-all duration-200 ${
                isRecording
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-[#5b67f8] text-white hover:bg-gray-800"
              }`}
            >
              {isRecording ? "Recording..." : "Record"}
            </button>
  
            <button
              onClick={handleProcessRecordedVideo}
              disabled={!recordedVideo}
              className={`w-1/2 py-3 rounded-full shadow-lg transform transition-all duration-200 ${
                !recordedVideo
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              Process Recorded Video
            </button>
          </div>
        </div>
  
        {/* Drag and Drop Section */}
        <div className="col-span-1 flex flex-col items-center space-y-4">
          <div className="w-full h-1/3 rounded-lg flex items-center justify-center relative">
            <iframe
              src="https://giphy.com/embed/F3q9rS4hISE4R3WcWT"
              width="200"
              height="200"
              className="giphy-embed pointer-events-none"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-transparent"></div>
          </div>
  
          <div
            {...getRootProps()}
            className="w-full h-1/2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-100 flex items-center justify-center"
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              Drag and drop a video here, or click to upload
            </p>
          </div>
  
          {uploadedVideo && (
            <div className="flex items-center space-x-2 mt-4">
              <p className="text-green-500 font-semibold">
                {uploadedVideo.name}
              </p>
              <button
                onClick={handleDeleteUploadedVideo}
                className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          )}
  
          <button
            onClick={handleProcessUploadedVideo}
            disabled={!uploadedVideo}
            className={`w-full py-3 rounded-full shadow-lg transform transition-all duration-200 ${
              !uploadedVideo
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            Process Uploaded Video
          </button>
        </div>
  
        {/* Translation Section */}
        <div className="bg-white bg-opacity-30 p-6 rounded-xl shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-thin text-white mb-4">Text Translation</h2>
          <div className="w-full h-64 bg-gray-100 rounded-lg p-4 flex items-center justify-center text-center mb-4">
            {loading ? (
              <ClipLoader color="#4A5568" size={40} />
            ) : (
              <p className="text-gray-700 text-lg">
                {gottranslation ? `Traveler is asking about ${translation}` : "No translation yet."}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/guide", { state: { signName: translation } })}
              disabled={!isGuideButtonEnabled} // Button disabled initially
              className={`w-2/3 py-3 rounded-full shadow-lg text-white font-semibold transition duration-300 ${
                isGuideButtonEnabled
                  ? "bg-[#5b67f8] hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Guide Traveler
            </button>
          </div>
        </div>

      </div>
    </div>
  );
  
};

export default Interpreter;
