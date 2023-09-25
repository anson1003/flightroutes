import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col, Card } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./Airport.css"; // Import your component's CSS stylesheet

function Airports() {
  const [airports, setAirports] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10); // 8 rows x 2 columns = 16 airports per page
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAirports, setFilteredAirports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/airports/")
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAirports(filtered);
    setCurrentPage(0);
  }, [searchQuery, airports]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastAirport = (currentPage + 1) * perPage;
  const indexOfFirstAirport = indexOfLastAirport - perPage;
  const currentAirports = filteredAirports.slice(
    indexOfFirstAirport,
    indexOfLastAirport
  );

  return (
    <Container className="text-white mt-4">
      <h1>Airports</h1>
      <Form.Group controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Search airports by name or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <Row className="mt-2">
        {currentAirports.map((airport) => (
          <Col xs={12} md={6} key={airport.code}>
            <Card className="mb-3 airport-card">
              <Card.Body>
                <Row>
                  <Col xs={6}>
                    <Card.Title>{airport.name}</Card.Title>
                  </Col>
                  <Col xs={6}>
                    <Card.Text className="text-right">
                      <strong>Code:</strong> {airport.code}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="center-pagination">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(filteredAirports.length / perPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          breakClassName={"page-item disabled"}
          activeClassName={"active"}
        />
      </div>
    </Container>
  );
}

export default Airports;
