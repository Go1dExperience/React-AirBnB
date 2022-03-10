import React, { useEffect } from "react";
import { connect } from "react-redux";
import RentalList from "./RentalList";
import LoadingIcon from "../../shared/LoadingIcon";
// import * as actions from '../../actions';
import { fetchRentals, cleanUpRentals } from "../../../actions";

function RentalListing(props) {
    const { fetchRentals, rentals, cleanUpRentals } = props;

    useEffect(() => {
        fetchRentals();
        return () => {
            cleanUpRentals();
        };
    }, [fetchRentals, cleanUpRentals]);
    if (rentals.length > 0) {
        return (
            <div>
                <section id="rentalListing">
                    <h1 className="page-title">Your Home Around The World</h1>
                    <RentalList rentals={rentals}></RentalList>
                </section>
            </div>
        );
    } else {
        return <LoadingIcon></LoadingIcon>;
    }
}
const mapState = state => ({
    rentals: state.data.rentals,
});
export default connect(mapState, { fetchRentals, cleanUpRentals })(
    RentalListing
);
