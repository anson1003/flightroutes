// ReturnDateInput.js
import React from "react";

function ReturnDateInput({ tripType, returnDate, setReturnDate }) {
  return (
    <div className="form-group">
      {tripType === "round-trip" && (
        <div className="form-group">
          <label htmlFor="returnDate">Return Date</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>
      )}
    </div>
  );
}

export default ReturnDateInput;
