import React from "react";
import { Row, Button } from "react-bootstrap";
import RouteInput from "./RouteInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function RouteList({ routes, handleRouteChange, addRoute, removeRoute }) {
  return (
    <>
      {routes.map((route, index) => (
        <Row md={5} key={index}>
          <RouteInput
            route={route}
            index={index}
            handleRouteChange={handleRouteChange}
          />
          {removeRoute && (
            <div className="px-3 pt-4">
              <Button
                className=" bg"
                variant="danger"
                type="button"
                onClick={() => removeRoute(index)}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </Button>
            </div>
          )}
        </Row>
      ))}
      {addRoute && (
        <div className="text-left mt-1">
          <Button variant="primary" type="button" onClick={addRoute}>
            Add Route
          </Button>
        </div>
      )}
    </>
  );
}

export default RouteList;
