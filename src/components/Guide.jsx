import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './Guide.css';

const GuidePage = () => {
  const location = useLocation();
  const [placeName, setPlaceName] = useState("");
  const [directions, setDirections] = useState("");
  const [handSignResponse, setHandSignResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState("");  // To handle geolocation errors

  // Fetch place name from passed state
  useEffect(() => {
    if (location.state?.signName) {
      setPlaceName(location.state.signName);
      handleSearch(location.state.signName);
    }
  }, [location.state]);

  // Function to handle nearby location search and response generation
  const handleSearch = async (signName) => {
    setLoading(true);
    try {
      // Get the current device location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const radius = 4800; // Approx 3 miles in meters

            // Use Nominatim API to search for nearby locations based on query
            const nominatimResponse = await axios.get(
              `https://nominatim.openstreetmap.org/search`,
              {
                params: {
                  q: signName,  // Search for the place name (e.g., ATM)
                  format: "json",
                  lat: latitude,
                  lon: longitude,
                  radius: radius,
                  limit: 5,  // Limit the results to a reasonable number
                },
              }
            );

            // Check if there are nearby locations
            if (nominatimResponse.data && nominatimResponse.data.length > 0) {
              const directions = nominatimResponse.data
                .map((place) => {
                  const distance = calculateDistance(latitude, longitude, place.lat, place.lon);
                  return `Go ${distance} meters to the ATM at ${place.display_name}`;
                })
                .join(", ");
              setDirections(directions);

              // Generate hand sign response for the directions (dummy example)
              const responseWords = ["Go", "West", "200", "meters"];  // Replace with dynamic response
              const handSignPaths = responseWords.map((word) =>
                word
                  .toLowerCase()
                  .split("")
                  .map((letter) => `../assets/alphabets/${letter}.png`) // Path to images of hand signs
              );
              setHandSignResponse(handSignPaths);
            } else {
              setDirections("No location found within 3 miles.");
            }
          },
          (error) => {
            // Handle geolocation error
            setGeoError("Unable to retrieve your location.");
            console.error(error);
          }
        );
      } else {
        setGeoError("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
      setDirections("Error fetching directions.");
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate distance between two latitude/longitude points (in meters)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Result in meters
    return Math.round(distance);
  };

  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg backdrop-blur-md bg-opacity-30">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Location: <span className="highlighted">{placeName || "N/A"}</span>
      </h2>
      {loading ? (
        <ClipLoader color="#4A5568" size={40} />
      ) : geoError ? (
        <div className="text-red-600 text-lg">{geoError}</div>
      ) : (
        <div>
          {/* Directions Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Directions to Nearby Location:
            </h3>
            <p className="text-gray-700">{directions || "No directions found."}</p>
          </div>

          {/* Hand-Sign Response Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Response for Deaf:
            </h3>
            <div className="flex space-x-4">
              {handSignResponse.map((word, wordIndex) => (
                <div key={wordIndex} className="flex space-x-2">
                  {word.map((imgPath, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imgPath}
                      alt="Hand Sign"
                      className="w-10 h-10"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidePage;
