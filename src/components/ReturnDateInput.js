import React from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

function ReturnDateInput({ tripType, returnDate, setReturnDate }) {
  return (
    <Row>
      {tripType === "round-trip" && (
        <Col xs={6} md={3}>
          <FormGroup>
            <Form.Label htmlFor="returnDate">Return Date</Form.Label>
            <Form.Control
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </FormGroup>
        </Col>
      )}
    </Row>
  );
}

export default ReturnDateInput;
