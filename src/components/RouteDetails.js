// RouteDetails.js
import React from "react";
import { useLocation } from "react-router-dom";

function RouteDetails() {
  const location = useLocation();
  const { routeArray, routeIndex } = location.state || {};
  console.log("Route Array:", routeArray);
  console.log("Route Index:", routeIndex);

  //   if (!routeArray || !Array.isArray(routeArray) || routeIndex === undefined) {
  //     return <div>Route not found</div>;
  //   }

  //   const route = routeArray[routeIndex];

  return (
    <div>
      {/* <h2>Route Details</h2>
      <p>
        Airline: {route.airlineName} ({route.airlineIATA})
      </p>
      <p>
        From: {route.airportFromName} ({route.airportFromCode})
      </p>
      <p>
        To: {route.airportToName} ({route.airportToCode})
      </p> */}
      {/* Add more details as needed */}
    </div>
  );
}

export default RouteDetails;
