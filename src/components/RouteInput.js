import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import axios from "axios";
import Autosuggest from "react-autosuggest";

function RouteInput({ route, index, handleRouteChange }) {
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedFromSuggestion, setSelectedFromSuggestion] = useState("");
  const [selectedToSuggestion, setSelectedToSuggestion] = useState("");
  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");

  const handleInputChange = (inputName, value) => {
    // Update the route state
    handleRouteChange(index, inputName, value);

    // Fetch suggestions for "From" and "To" based on the input value
    fetchSuggestions(value);

    // Reset the selected suggestion when input changes
    if (inputName === "airport_from") {
      setSelectedFromSuggestion("");
    } else if (inputName === "airport_to") {
      setSelectedToSuggestion("");
    }
  };

  const fetchSuggestions = async (searchString) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/airport_autocomplete/",
        {
          search_string: searchString,
        }
      );

      if (searchString === route.airport_from) {
        setFromSuggestions(response.data.results);
      } else if (searchString === route.airport_to) {
        setToSuggestions(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching suggestions: ", error);
    }
  };

  const handleFromInputChange = (event, { newValue }) => {
    setFromInputValue(newValue);
    handleInputChange("airport_from", newValue);
  };

  const handleToInputChange = (event, { newValue }) => {
    setToInputValue(newValue);
    handleInputChange("airport_to", newValue);
  };

  const handleSuggestionClick = (inputName, suggestion) => {
    if (inputName === "airport_from") {
      setSelectedFromSuggestion(suggestion.name);
      handleInputChange("airport_from", suggestion.code);
    } else if (inputName === "airport_to") {
      setSelectedToSuggestion(suggestion.name);
      handleInputChange("airport_to", suggestion.code);
    }
  };

  const handleInputBlur = (inputName) => {
    // Clear the selected suggestion when input loses focus
    if (inputName === "airport_from") {
      setSelectedFromSuggestion("");
    } else if (inputName === "airport_to") {
      setSelectedToSuggestion("");
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  return (
    <>
      <Col>
        <Form.Group>
          <Form.Label htmlFor={`from${index}`}>From</Form.Label>
          <Autosuggest
            inputProps={{
              id: `from${index}`,
              value: fromInputValue,
              onChange: handleFromInputChange,
              onBlur: () => handleInputBlur("airport_from"),
              placeholder: "Enter From Airport",
              className: "form-control",
            }}
            suggestions={fromSuggestions}
            onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
            onSuggestionsClearRequested={() => setFromSuggestions([])}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={(event, { suggestion }) =>
              handleSuggestionClick("airport_from", suggestion)
            }
          />
        </Form.Group>
      </Col>

      <Col>
        <Form.Group>
          <Form.Label htmlFor={`to${index}`}>To</Form.Label>
          <Autosuggest
            inputProps={{
              id: `to${index}`,
              value: toInputValue,
              onChange: handleToInputChange,
              onBlur: () => handleInputBlur("airport_to"),
              placeholder: "Enter From Airport",
              className: "form-control",
            }}
            suggestions={toSuggestions}
            onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
            onSuggestionsClearRequested={() => setToSuggestions([])}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={(event, { suggestion }) =>
              handleSuggestionClick("airport_to", suggestion)
            }
          />
        </Form.Group>
      </Col>

      <Col>
        <Form.Group>
          <Form.Label htmlFor={`class${index}`}>Class</Form.Label>
          <Form.Control
            as="select"
            id={`class${index}`}
            value={route.flight_class}
            onChange={(e) =>
              handleRouteChange(index, "flight_class", e.target.value)
            }
          >
            <option value="Economy class">Economy class</option>
            <option value="Business class">Business class</option>
            <option value="First class">First class</option>
          </Form.Control>
        </Form.Group>
      </Col>

      <Col>
        <Form.Group>
          <Form.Label htmlFor={`date${index}`}>Date</Form.Label>
          <Form.Control
            type="date"
            id={`date${index}`}
            value={route.departure_date}
            onChange={(e) =>
              handleRouteChange(index, "departure_date", e.target.value)
            }
            required
          />
        </Form.Group>
      </Col>
    </>
  );
}

export default RouteInput;
