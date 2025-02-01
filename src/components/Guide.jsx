import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./Guide.css";
// const images = import.meta.glob('/src/assets/alphabets/*.png');
import Compass from "./Compass";

const GuidePage = () => {
  const location = useLocation();
  const [placeName, setPlaceName] = useState("");
  const [directions, setDirections] = useState("");
  const [handSignResponse, setHandSignResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if (location.state?.signName) {
      setPlaceName(location.state.signName);
      handleSearch(location.state.signName);
    }
  }, [location.state]);

  // Haversine formula to calculate distance between two lat/lon points
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Returns the distance in meters
  };

  // Calculate direction
  const calculateDirection = (lat1, lon1, lat2, lon2) => {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const brng = Math.atan2(y, x);
    const degrees = (brng * 180) / Math.PI;
    const direction = (degrees + 360) % 360; // Normalize to [0, 360)

    // Determine cardinal direction
    if (direction >= 0 && direction < 45) return "north";
    if (direction >= 45 && direction < 135) return "east";
    if (direction >= 135 && direction < 225) return "south";
    if (direction >= 225 && direction < 315) return "west";
    return "north"; // Default case
  };

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setGeoError("");
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser.");
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          let sign = searchQuery.toLowerCase();
          const query = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=${sign}];out;`;

          try {
            const response = await fetch(query);
            const data = await response.json();
            const spots = data.elements;

            if (spots.length > 0) {
              const nearestSpot = spots[0]; // First spot returned
              const spotLat = nearestSpot.lat;
              const spotLon = nearestSpot.lon;

              // Calculate the distance and direction
              const distance = haversine(latitude, longitude, spotLat, spotLon);
              const direction = calculateDirection(latitude, longitude, spotLat, spotLon);

              setDirections(
                `Nearest ${searchQuery}: ${Math.round(distance)} meters ${direction}`
              );

              // Create hand-sign response
              const responseWords = `${Math.round(distance)} meters ${direction}`.split(/\s+/);
              const handSignPaths = responseWords.map((word) =>
                word
                  .toLowerCase()
                  .split("")
                  .map((letter) => `${process.env.PUBLIC_URL}/assets/alphabets/${letter}.png`)
                  
                  // .map((letter) => require(`/assets/alphabets/${letter}.png`))
              );
              
              setHandSignResponse(handSignPaths);
            } else {
              setDirections(`No ${searchQuery} found nearby.`);
            }
          } catch (error) {
            console.error("Error fetching data from Overpass API:", error);
            setDirections("Failed to generate content.");
          }
        },
        (error) => {
          setGeoError("Failed to fetch your location. Please try again.");
        }
      );
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      setGeoError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Traveler asked for nearest : <span className="highlighted">{placeName || "N/A"}</span>
      </h2>
      {loading ? (
        <ClipLoader color="#4A5568" size={40} />
      ) : geoError ? (
        <div className="text-red-600 text-lg">{geoError}</div>
      ) : (
        <div>
          <div className="w-full bg-green-100 p-4 mb-6 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Directions to Nearby Location:
            </h3>
            <p className="text-gray-700">{directions || "No directions found."}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Response for Deaf:
            </h3>

            <div className="w-full bg-green-100 py-6">
  <div className="flex justify-center space-x-8">
    {handSignResponse.map((word, wordIndex) => (
      <div key={wordIndex} className="flex flex-col items-center space-x-2">
        <div className="flex space-x-2">
          {word.map((imgPath, imgIndex) => (
            <div key={imgIndex} className="flex flex-col items-center">
              <img
                src={imgPath}
                alt="Hand Sign"
                className="w-18 h-24 rounded-md shadow"
              />
              <span className="text-sm text-gray-700 mt-1">
                {imgPath.split("/").pop().split(".")[0].toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>


          </div>
        </div>
      )}
    </div>
  );
};

export default GuidePage;
