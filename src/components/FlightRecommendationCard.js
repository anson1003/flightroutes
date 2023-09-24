import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function FlightRecommendationCard({ routeArray }) {
  return (
    <div className="bg-black">
      {routeArray.map((route, routeIndex) => (
        <Card key={routeIndex} className="mb-2 mx-1">
          {" "}
          {/* Add mx-2 for left and right margin */}
          <Card.Body className="d-flex justify-content-between">
            <div>
              <p>
                <strong>From:</strong>
              </p>
              <p>
                {route.airportFromName}({route.airportFromCode})
              </p>
            </div>
            <div>
              <p>
                <strong>Airline:</strong>
                {route.airlineName} ({route.airlineIATA})
              </p>
              <p>
                <strong>Duration:</strong>{" "}
                {Math.ceil(route.common_duration / 60)}
                :Hrs
              </p>
            </div>
            <div>
              <p>
                <strong>To:</strong>
              </p>
              <p>
                {route.airportToName} ({route.airportToCode})
              </p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default FlightRecommendationCard;
