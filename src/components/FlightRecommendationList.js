// FlightRecommendationList.js
import React from "react";
import FlightRecommendationCard from "./FlightRecommendationCard";

function FlightRecommendationList({ recommendations, loading }) {
  return (
    <section id="recommendations" className="mt-4">
      <div className="container">
        <div
          className="col-lg-12"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : recommendations.length === 0 ? (
            <p className="text-white">No routes found</p>
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
