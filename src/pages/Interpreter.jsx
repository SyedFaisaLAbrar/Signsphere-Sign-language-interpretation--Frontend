import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";

const Interpreter = () => {
  const [translation, setTranslation] = useState("Translation will appear here.");
  const [isRecording, setIsRecording] = useState(false);
  // const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(null); // Timer hidden by default
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null); // For uploaded video
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const webcamRef = useRef(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      setUploadedVideo(acceptedFiles[0]);
      setIsWebcamOn(false); // Turn off webcam
    }
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

  const handleProcessRecordedVideo = async () => {
    
    if (!recordedVideo) return;

    const formData = new FormData();
    formData.append("video", recordedVideo, "recorded-video.mp4");

    try {
      const response = await fetch("http://0.0.0.0:8000/process_video", {
        method: "POST",
        body: formData,
      });
      setTranslation("Processing...");

      const result = await response.json();
      setTranslation(result.translation || "Translation could not be processed.");
    } catch (error) {
      setTranslation("Error processing video. Please try again.");
    }
  };

  const handleProcessUploadedVideo = async () => {
    if (!uploadedVideo) return;

    const formData = new FormData();
    formData.append("video", uploadedVideo, uploadedVideo.name);

    try {
      const response = await fetch("http://0.0.0.0:8000/process_video", {
        method: "POST",
        body: formData,
      });
      setTranslation("Processing...");

      const result = await response.json();
      setTranslation(result.translation || "Translation could not be processed.");
    } catch (error) {
      setTranslation("Error processing video. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black px-4 py-4 flex justify-between items-center">
        <div className="text-white text-sm font-bold">Signsphere</div>
        <div className="flex space-x-4">
          {["Home", "About", "Services", "Contact"].map((item, index) => (
            <a
              key={index}
              href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
              className="text-white bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium relative group"
            >
              <span className="absolute inset-0 border-2 border-transparent rounded-full group-hover:border-white group-hover:animate-light transition-all duration-300"></span>
              <span className="relative z-10">{item}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="px-6 py-10 grid grid-cols-4 gap-12">
        {/* Recording Section */}
        <div className="bg-gradient-to-r col-span-2 from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Record</h2>
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
          {/* Record Button */}
          <button
            onClick={handleRecord}
            disabled={isRecording}
            className={`w-1/2 py-3 rounded-full shadow-lg transform transition-all duration-200 ${
              isRecording ? "bg-gray-500 text-white cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isRecording ? "Recording..." : "Record"}
          </button>

          {/* Process Recorded Video Button */}
          <button
            onClick={handleProcessRecordedVideo}
            disabled={!recordedVideo}
            className={`w-1/2 py-3 rounded-full shadow-lg transform transition-all duration-200 ${
              !recordedVideo ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            Process Recorded Video
          </button>
        </div>
                    
          
        </div>

        {/* Drag and Drop Section */}
        {/* Drag and Drop Section with GIF */}
        <div className="col-span-1 flex flex-col items-center space-y-4">
          {/* Square GIF Section */}
          <div className="w-full h-1/3  rounded-lg flex items-center justify-center ">
            {/* Replace with GIF */}
            <iframe src="https://giphy.com/embed/F3q9rS4hISE4R3WcWT" width="200" height="200" class="giphy-embed" allowFullScreen></iframe>
           
          </div>

          {/* Drag and Drop Section */}
          <div
            {...getRootProps()}
            className="w-full h-1/2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-100 flex items-center justify-center"
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">Drag and drop a video here, or click to upload</p>
          </div>

          {/* Button */}
          <button
            onClick={handleProcessUploadedVideo}
            disabled={!uploadedVideo}
            className={`w-full py-3 rounded-full shadow-lg transform transition-all duration-200 ${
              !uploadedVideo ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            Process Uploaded Video
          </button>
        </div>



        {/* Translation Section */}
        <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Translation</h2>
          <div className="w-full h-64 bg-gray-100 rounded-lg p-4 flex items-center justify-center text-center mb-4">
            <p className="text-gray-700 text-lg">{translation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interpreter;


// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { useDropzone } from "react-dropzone";

// const Interpreter = () => {
//   const [translation, setTranslation] = useState("Translation will appear here.");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [countdown, setCountdown] = useState(null); // Timer hidden by default
//   const [recordedVideo, setRecordedVideo] = useState(null);
//   const [uploadedVideo, setUploadedVideo] = useState(null); // For uploaded video
//   const [isWebcamOn, setIsWebcamOn] = useState(true);
//   const webcamRef = useRef(null);

//   const handleDrop = (acceptedFiles) => {
//     if (acceptedFiles.length) {
//       setUploadedVideo(acceptedFiles[0]);
//       setIsWebcamOn(false); // Turn off webcam
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { "video/*": [] },
//     onDrop: handleDrop,
//   });

//   // Countdown and recording logic
//   const handleRecord = () => {
//     setCountdown(3); // Initialize countdown
//     setIsWebcamOn(true); // Turn on webcam
//     setIsRecording(false);

//     let timer = 3;
//     const countdownInterval = setInterval(() => {
//       timer--;
//       setCountdown(timer);
//       if (timer === 0) {
//         clearInterval(countdownInterval);
//         setCountdown(null);
//         startRecording();
//       }
//     }, 1000);
//   };

//   // Start recording logic
//   const startRecording = () => {
//     setIsRecording(true);
//     const stream = webcamRef.current.stream;
//     const videoStream = new MediaStream(stream.getVideoTracks()); // Extract only video tracks
//     const mediaRecorder = new MediaRecorder(videoStream);
//     // const mediaRecorder = new MediaRecorder(webcamRef.current.stream);
//     const videoChunks = [];

//     mediaRecorder.ondataavailable = (event) => {
//       videoChunks.push(event.data);
//     };

//     mediaRecorder.onstop = () => {
//       const videoBlob = new Blob(videoChunks, { type: "video/mp4" });
//       setRecordedVideo(videoBlob);
//       setIsRecording(false);
//       setIsProcessing(true); // Enable "Start Interpretation"
//     };

//     mediaRecorder.start();
//     setTimeout(() => {
//       mediaRecorder.stop();
//     }, 9000); // Record for 9 seconds
//   };

//   // Start interpretation logic
//   const handleStartInterpretation = async () => {
//     const video = uploadedVideo || recordedVideo;
//     if (!video) return;

//     const formData = new FormData();
//     formData.append("video", video, video.name || "recorded-video.mp4");

//     try {
//       const response = await fetch("http://localhost:8000/process-video", {
//         method: "POST",
//         body: formData,
//       });
//       setIsWebcamOn(false); // Turn off webcam
//       setCountdown(null); // Hide countdown
//       setTranslation("Processing..."); // Temporary feedback

//       const result = await response.json();
//       setTranslation(result.translation || "Translation could not be processed.");
//       setIsProcessing(false); // Re-enable recording
//     } catch (error) {
//       setTranslation("Error processing video. Please try again.");
//       setIsProcessing(false); // Re-enable recording
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-black px-4 py-4 flex justify-between items-center">
//         <div className="text-white text-sm font-bold">Signsphere</div>
//         <div className="flex space-x-4">
//           {["Home", "About", "Services", "Contact"].map((item, index) => (
//             <a
//               key={index}
//               href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
//               className="text-white bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium relative group"
//             >
//               <span className="absolute inset-0 border-2 border-transparent rounded-full group-hover:border-white group-hover:animate-light transition-all duration-300"></span>
//               <span className="relative z-10">{item}</span>
//             </a>
//           ))}
//         </div>
//       </nav>

//       <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-12">
//         {/* Webcam Section */}
//         <div className="bg-gradient-to-r col-span-2 from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Record or Upload</h2>
//           <div className="relative w-full h-80 bg-gray-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden shadow-xl">
//             {countdown !== null && (
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-6xl font-bold">
//                 {countdown}
//               </div>
//             )}
//             {isWebcamOn ? (
//               <Webcam
//                 audio={true}
//                 ref={webcamRef}
//                 className="rounded-lg w-full h-full object-cover"
//                 videoConstraints={{
//                   width: 1280,
//                   height: 720,
//                   aspectRatio: 16 / 9,
//                 }}
//               />
//             ) : (
//               <video
//                 src={uploadedVideo ? URL.createObjectURL(uploadedVideo) : ""}
//                 controls
//                 className="rounded-lg w-full h-full object-cover"
//               />
//             )}
//           </div>

//           <div className="flex space-x-4">
//             <button
//               onClick={handleRecord}
//               disabled={isRecording || isProcessing}
//               className={`w-1/2 py-3 rounded-full shadow-sm transform transition-all duration-200 ${
//                 isRecording || isProcessing
//                   ? "bg-gray-500 text-white cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//             >
//               {isRecording ? "Recording..." : "Record"}
//             </button>
//             <button
//               onClick={handleStartInterpretation}
//               disabled={!isProcessing && !uploadedVideo}
//               className={`w-1/2 py-3 rounded-full shadow-lg transform transition-all duration-200 ${
//                 !isProcessing && !uploadedVideo
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-white text-gray-800 hover:bg-gray-100"
//               }`}
//             >
//               Start Interpretation
//             </button>
//           </div>
//           <div
//             {...getRootProps()}
//             className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
//           >
//             <input {...getInputProps()} />
//             <p className="text-gray-600">Drag and drop a video here, or click to upload</p>
//           </div>
//         </div>

//         {/* Translation Section */}
//         <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Translation</h2>
//           <div className="w-full h-64 bg-gray-100 rounded-lg p-4 flex items-center justify-center text-center">
//             <p className="text-gray-700 text-lg">{translation}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Interpreter;
