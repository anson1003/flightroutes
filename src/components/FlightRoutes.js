// FlightRoutes.js
import React, { useState } from "react";
import axios from "axios";
import TripTypeSelector from "./TripTypeSelector";
import RouteList from "./RouteList";
import ReturnDateInput from "./ReturnDateInput";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { RECOMMEND_FLIGHTS_API } from "../config";
import FlightRecommendationList from "./FlightRecommendationList";

function FlightRoutes() {
  const [recommendations, setRecommendations] = useState([]);
  const [tripType, setTripType] = useState("one-way");
  const [loading, setLoading] = useState(false); // Initialize loading state as false
  const [routes, setRoutes] = useState([
    {
      airport_from: "",
      airport_to: "",
      flight_class: "",
      departure_date: "",
    },
  ]);
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    let formData = {
      class_: [],
      tripType,
      routes: routes.map((route) => ({
        date: route.departure_date,
        departure: route.airport_from,
        arrival: route.airport_to,
      })),
      // returnDate: tripType === "round-trip" ? returnDate : null,
    };

    // Include return route data for round-trip
    if (tripType === "round-trip") {
      formData.routes.push({
        date: returnDate,
        departure: routes[0].airport_to,
        arrival: routes[0].airport_from,
      });
    }

    try {
      const response = await axios.post(RECOMMEND_FLIGHTS_API, formData);

      console.log("Recommendations:", response.data);
      setRecommendations(response.data);
      setLoading(false); // Set loading to false when data is received
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Set loading to false when data is received
    }
  };

  const handleRouteChange = (index, field, value) => {
    const updatedRoutes = [...routes];
    updatedRoutes[index][field] = value;
    setRoutes(updatedRoutes);
  };

  const addRoute = () => {
    setRoutes([
      ...routes,
      {
        airport_from: "",
        airport_to: "",
        flight_class: "",
        departure_date: "",
      },
    ]);
  };

  return (
    <div className="bg-black pt-5 vh-100 w-100">
      <section className="px-5 py-1 sticky-top fixed-top">
        <Card className="">
          <Card.Body>
            <Form onSubmit={handleSubmit} id="flightBook">
              <Form.Group controlId="tripType">
                <TripTypeSelector
                  tripType={tripType}
                  setTripType={setTripType}
                  setRoutes={setRoutes}
                />
              </Form.Group>
              <RouteList
                routes={routes}
                handleRouteChange={handleRouteChange}
                addRoute={tripType === "multi-city" && addRoute}
              />
              <ReturnDateInput
                tripType={tripType}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />

              <div className="text-center mt-1">
                <Button variant="primary" type="submit" className="">
                  Search
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </section>
      <FlightRecommendationList
        recommendations={recommendations}
        loading={loading}
      />
    </div>
  );
}

export default FlightRoutes;
