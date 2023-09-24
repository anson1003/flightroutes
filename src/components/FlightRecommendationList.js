// FlightRecommendationList.js

import React from "react";
import FlightRecommendationCard from "./FlightRecommendationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function FlightRecommendationList({ recommendations, loading }) {
  return (
    <section id="recommendations" className="mt-4">
      <div className="container">
        <div
          className="col-lg-12"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {loading ? (
            <p className="text-center text-white">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="2xl"
                style={{ color: "#0a12ff" }}
              />{" "}
            </p>
          ) : recommendations.length === 0 ||
            recommendations[0].length === 0 ? (
            <p className="text-white text-center">No routes found</p>
          ) : (
            recommendations.map((routeArray, index) => (
              <FlightRecommendationCard key={index} routeArray={routeArray} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default FlightRecommendationList;
