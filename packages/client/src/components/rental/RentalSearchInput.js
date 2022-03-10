import React, { useRef } from "react";
import { withRouter } from "react-router-dom";

function RentalSearchInput(props) {
  let searchInput = useRef("");

  const handleSearch = () => {
    const { history } = props;
    let city = searchInput.current.value;
    city ? history.push(`/rentals/${city}/homes`) : history.push("/rentals");
    city = "";
  };
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <form className="form-inline my-2 my-lg-0">
      <div className="input-group">
        <input
          onKeyPress={event => handleKeyPress(event)}
          ref={searchInput}
          type="search"
          className="form-control mr-sm-2 bwm-search"
          placeholder="Try 'New York'"
          aria-label="Search"
        />
        <button
          onClick={handleSearch}
          className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default withRouter(RentalSearchInput);
