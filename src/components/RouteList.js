// RouteList.js
import React from "react";
import { Row, Button } from "react-bootstrap";
import RouteInput from "./RouteInput";

function RouteList({ routes, handleRouteChange, addRoute }) {
  return (
    <Row md={4}>
      {routes.map((route, index) => (
        <RouteInput
          key={index}
          route={route}
          index={index}
          handleRouteChange={handleRouteChange}
        />
      ))}

      {addRoute && (
        <div className="text-left mt-1">
          <Button variant="primary" type="button" onClick={addRoute}>
            Add Route
          </Button>
        </div>
      )}
    </Row>
  );
}

export default RouteList;
