import { useEffect, useState } from "react";

export default function CompassComponent() {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (event) => {
        if (event.alpha !== null) {
          setHeading(event.alpha); // Alpha gives compass direction
        }
      };
      
      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    } else {
      alert("Compass feature not supported on this device.");
    }
  }, []);

  navigator.permissions.query({ name: "gyroscope" }).then(result => {
    if (result.state !== "granted") {
      alert("Please enable compass permissions.");
    }
  });

  return (
    <div className="w-full bg-green-100 p-4 mb-6 rounded-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Directions to Nearby Location:
        </h3>
        <p className="text-gray-700">Your heading: {Math.round(heading)}°</p>
      </div>

      <div className="relative w-32 h-32 rounded-full border-8 border-gray-300 flex items-center justify-center">
        <div
          className="absolute w-2 h-16 bg-red-500 rounded-md"
          style={{
            transform: `rotate(${heading}deg)`,
          }}
        />
      </div>
    </div>
  );
}
