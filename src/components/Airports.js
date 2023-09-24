import React, { useState, useEffect } from "react";

function Airports() {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    // Fetch the list of airports when the component mounts
    fetch("http://localhost:8000/airports/")
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="text-white mt-4">
      <h1>Airports</h1>
      <ul>
        {airports.map((airport) => (
          <li key={airport.code}>
            <strong>Code:</strong> {airport.code}, <strong>Name:</strong>{" "}
            {airport.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Airports;
