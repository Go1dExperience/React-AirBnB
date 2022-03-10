import React, { useEffect } from "react";
import RentalList from "./RentalList";
import { connect } from "react-redux";
import { fetchRentals, cleanUpRentals } from "../../../actions";

function RentalSearching(props) {
    const city = props.match.params.city;
    const { fetchRentals, rentals, cleanUpRentals } = props;

    useEffect(() => {
        fetchRentals(city);
        return () => {
            cleanUpRentals();
        };
    }, [city, fetchRentals, cleanUpRentals]);
    // Check for data or errors
    const renderTitle = () => {
        let title = "";
        const errors = rentals.errors;
        const result = rentals.rentals;
        if (errors.length > 0) {
            console.log(errors);
            title = errors[0].detail;
        }
        if (result.length > 0) {
            title = `Places To Stay In ${city.toUpperCase()}:`;
        }
        return <h1 className="page-title">{title}</h1>;
    };
    return (
        <div>
            <section id="rentalListing">
                {renderTitle()}
                <RentalList rentals={rentals.rentals}></RentalList>
            </section>
        </div>
    );
}

const mapState = state => ({
    rentals: state.data,
});
export default connect(mapState, { fetchRentals, cleanUpRentals })(
    RentalSearching
);
