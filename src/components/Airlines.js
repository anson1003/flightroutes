import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import "./Airlines.css"; // Import your custom CSS file for styling
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Airlines() {
  const [airlines, setAirlines] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  const airlinesPerPage = 9; // Number of airlines to display per page

  useEffect(() => {
    // Fetch the list of airlines when the component mounts
    fetch("http://localhost:8000/airlines/")
      .then((response) => response.json())
      .then((data) => {
        setAirlines(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0); // Reset to the first page when searching
  };

  // Filter airlines by name or code based on the search term
  const filteredAirlines = airlines.filter(
    (airline) =>
      airline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airline.IATA.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index of the first and last airlines to display on the current page
  const indexOfLastAirline = (pageNumber + 1) * airlinesPerPage;
  const indexOfFirstAirline = indexOfLastAirline - airlinesPerPage;
  const currentAirlines = filteredAirlines.slice(
    indexOfFirstAirline,
    indexOfLastAirline
  );

  return (
    <div className="text-white mt-4 p-5 vh-100 w-100">
      <h1>Airlines</h1>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name or code"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      {/* Loading message */}
      {loading && (
        <p className="text-center text-white">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2xl"
            style={{ color: "#0a12ff" }}
          />
        </p>
      )}

      <div className="row">
        {currentAirlines.map((airline) => (
          <div key={airline.IATA} className="col-lg-4 mb-4">
            <Link to={`/airlines/${airline.IATA}`}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className="name">{airline.name}</span>
                    <span className="code">{airline.IATA}</span>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="center-pagination">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(filteredAirlines.length / airlinesPerPage)}
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
    </div>
  );
}

export default Airlines;
