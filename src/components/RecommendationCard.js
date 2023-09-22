import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function RecommendationCard({ routeArray }) {
  return (
    <div className="flight-card bg-black">
      <h4 className="text-white">Flight Recommendations</h4>
      {routeArray.map((route, routeIndex) => (
        <Card key={routeIndex} className="mb-2 mx-2">
          {" "}
          {/* Add mx-2 for left and right margin */}
          <Card.Body className="d-flex justify-content-between">
            <div>
              <p>From:</p>
              <p>
                {route.airportFromName}({route.airportFromCode})
              </p>
            </div>
            <div>
              <p>
                Airline:{route.airlineName} ({route.airlineIATA})
              </p>
              <p>
                Duration: {Math.ceil(route.common_duration / 60)}
                :Hrs
              </p>
            </div>
            <div>
              <p>To:</p>
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

export default RecommendationCard;
