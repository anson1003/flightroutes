import React, { useRef } from "react";
import { Form } from "react-bootstrap";

function TripTypeSelector({ tripType, setTripType, setRoutes }) {
  const formRef = useRef(null);

  const handleTripTypeChange = (newTripType) => {
    // Reset the form state when the trip type changes
    if (newTripType !== tripType) {
      setRoutes([
        {
          airport_from: "",
          airport_to: "",
          flight_class: "",
          departure_date: "",
        },
      ]);
    }

    setTripType(newTripType);
    formRef.current.reset();
  };

  return (
    <Form ref={formRef}>
      <Form.Group className="d-flex justify-content-center">
        <div className="mb-2">
          <Form.Check
            type="radio"
            label="One Way"
            name="tripType"
            id="oneWay"
            value="one-way"
            checked={tripType === "one-way"}
            onChange={() => handleTripTypeChange("one-way")}
          />
        </div>
        <div className="mx-2 mb-2">
          <Form.Check
            type="radio"
            label="Round Trip"
            name="tripType"
            id="roundTrip"
            value="round-trip"
            checked={tripType === "round-trip"}
            onChange={() => handleTripTypeChange("round-trip")}
          />
        </div>
        <div className="mb-2">
          <Form.Check
            type="radio"
            label="Multi City"
            name="tripType"
            id="multiCity"
            value="multi-city"
            checked={tripType === "multi-city"}
            onChange={() => handleTripTypeChange("multi-city")}
          />
        </div>
      </Form.Group>
    </Form>
  );
}

export default TripTypeSelector;
