import React from "react";
import { Form } from "react-bootstrap";

function TripTypeSelector({ tripType, setTripType }) {
  return (
    <Form.Group className="d-flex justify-content-center ">
      <div className="m-3">
        <Form.Check
          type="radio"
          label="One Way"
          name="tripType"
          id="oneWay"
          value="one-way"
          checked={tripType === "one-way"}
          onChange={() => setTripType("one-way")}
        />
      </div>
      <div className="m-3">
        <Form.Check
          type="radio"
          label="Round Trip"
          name="tripType"
          id="roundTrip"
          value="round-trip"
          checked={tripType === "round-trip"}
          onChange={() => setTripType("round-trip")}
        />
      </div>
      <div className="m-3">
        <Form.Check
          type="radio"
          label="Multi City"
          name="tripType"
          id="multiCity"
          value="multi-city"
          checked={tripType === "multi-city"}
          onChange={() => setTripType("multi-city")}
        />
      </div>
    </Form.Group>
  );
}

export default TripTypeSelector;
