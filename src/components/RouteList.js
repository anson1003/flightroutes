// RouteList.js
import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import RouteInput from "./RouteInput";

function RouteList({ routes, handleRouteChange, addRoute }) {
  return (
    <Row>
      {routes.map((route, index) => (
        <RouteInput
          route={route}
          index={index}
          handleRouteChange={handleRouteChange}
        />
      ))}

      {addRoute && (
        <Col>
          <Button variant="primary" type="button" onClick={addRoute}>
            Add Route
          </Button>
        </Col>
      )}
    </Row>
  );
}

export default RouteList;
