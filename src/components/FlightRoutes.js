// FlightRoutes.js
import React, { useState } from "react";
import axios from "axios";
import TripTypeSelector from "./TripTypeSelector";
import RouteList from "./RouteList";
import ReturnDateInput from "./ReturnDateInput";
import RecommendationCard from "./RecommendationCard";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function FlightRoutes() {
  const [recommendations, setRecommendations] = useState([]);
  const [tripType, setTripType] = useState("one-way");
  const [routes, setRoutes] = useState([
    {
      airport_from: "",
      airport_to: "",
      flight_class: "",
      departure_date: "",
    },
  ]);
  const [returnDate, setReturnDate] = useState("");
  const [airlines, setAirlines] = useState();
  const [date, setDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      class_: [],
      airlines,
      tripType,
      routes: routes.map((route) => ({
        date: route.departure_date,
        departure: route.airport_from,
        arrival: route.airport_to,
      })),
      returnDate: tripType === "round-trip" ? returnDate : null,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/recommend_flights/",
        formData
      );

      console.log("Recommendations:", response.data);
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error:", error);
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
    <>
      <section className="m-5 sticky-top fixed-top">
        <Card className="mt-4">
          <Card.Body>
            {/* <h3>Flight Booking</h3> */}
            <Form onSubmit={handleSubmit} id="flightBook">
              <Form.Group controlId="tripType">
                <TripTypeSelector
                  tripType={tripType}
                  setTripType={setTripType}
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
              <Button
                variant="primary"
                type="submit"
                className="d-flex justify-content-center"
              >
                Search
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </section>
      <section id="recommendations" className="mt-5">
        <div className="container">
          {/* <div className="row">
            <h4 className>Flight Recommendations</h4> */}
          <div
            className="col-md-12"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {recommendations.map((routeArray, index) => (
              <RecommendationCard key={index} routeArray={routeArray} />
            ))}
          </div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
}

export default FlightRoutes;
