// AirlineRoutes.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card"; // Import Bootstrap Card component

function AirlineRoutes() {
  const { airlineCode } = useParams();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Define the request body
    const requestBody = {
      airline: airlineCode,
    };

    // Make a POST request to your endpoint
    axios
      .post("http://localhost:8000/recommend_airline_routes/", requestBody)
      .then((response) => {
        // Set the routes data in the state
        setRoutes(response.data);
        setLoading(false); // Set loading to false when data is received
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
      });
  }, [airlineCode]); // Re-fetch routes when airlineCode changes

  return (
    <div className="text-white mt-4 p-5 vh-100 w-100">
      <h1>Routes for Airline {airlineCode}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : routes.length === 0 ? (
        <p>No routes found for this airline.</p>
      ) : (
        routes.map((routeArray, outerIndex) => (
          <div key={outerIndex}>
            {routeArray.map((route, innerIndex) => (
              <Card key={innerIndex} className="mb-3">
                <Card.Body>
                  <Card.Title>Route {innerIndex + 1}</Card.Title>
                  <Card.Text>
                    <strong>From:</strong> {route.airportFromName} (
                    {route.airportFromCode}) <br />
                    <strong>To:</strong> {route.airportToName} (
                    {route.airportToCode}) <br />
                    <strong>Duration:</strong> {route.common_duration} minutes
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default AirlineRoutes;
