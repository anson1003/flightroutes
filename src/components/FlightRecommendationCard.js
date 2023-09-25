import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {
  faClock,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

function FlightRecommendationCard({ routeArray }) {
  return (
    <div className="bg-black">
      {routeArray.map((route, routeIndex) => (
        <Card key={routeIndex} className="mb-2 mx-1">
          {" "}
          {/* Add mx-2 for left and right margin */}
          <Card.Body className="d-flex justify-content-between mx-2">
            <div>
              <p>
                <strong>
                  {route.airlineName}({route.airlineIATA})
                </strong>
                <p className="button-secondary"></p>
              </p>
              <p>
                <Link
                  to={{
                    pathname: `/route/${routeIndex}`,
                    state: { routeArray, routeIndex }, // Pass routeArray and routeIndex as state
                  }}
                  className="no-underline"
                >
                  Full Details
                </Link>{" "}
                {/* <Link className="no-underline">Price Details</Link> */}
              </p>
            </div>

            <div>
              <p className="">
                {route.airportFromCode}
                <FontAwesomeIcon icon={faPlaneDeparture} />
                --------------------
                <FontAwesomeIcon icon={faPlane} fade />
                --------------------
                <FontAwesomeIcon icon={faPlaneArrival} />
                {route.airportToCode}
              </p>
              <p className="text-center">
                <strong>
                  <FontAwesomeIcon icon={faClock} />:
                </strong>{" "}
                {Math.ceil(route.common_duration / 60)}
                :Hrs{" "}
                <span>
                  <strong>Direct</strong>
                </span>
              </p>
            </div>
            <div>
              <p className="text-center">
                <Button>
                  <a
                    className="text-white no-underline"
                    href="https://www.makemytrip.com/"
                    target="_blank" // To open the link in a new tab (optional)
                    rel="noopener noreferrer" // Recommended for security when using target="_blank"
                  >
                    Book
                  </a>
                </Button>
              </p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default FlightRecommendationCard;
