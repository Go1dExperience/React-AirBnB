import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserBookings, cleanUpBookings } from "../../../actions";
import LoadingIcon from "../../shared/LoadingIcon";
import { Link } from "react-router-dom";

import BookingCard from "./BookingCard";

function BookingManage(props) {
    const { data, fetchUserBookings, cleanUpBookings } = props;
    useEffect(() => {
        fetchUserBookings();
        return () => {
            cleanUpBookings();
        };
    }, [fetchUserBookings, cleanUpBookings]);
    const { bookings, errors } = data;

    if (bookings && bookings[0]) {
        return (
            <section id="userBookings">
                <h1 className="page-title">My Bookings</h1>
                <div className="row">
                    <BookingCard bookings={bookings}></BookingCard>
                </div>
            </section>
        );
    }
    if (errors[0]) {
        return (
            <div>
                <h1>Booking errors</h1>
            </div>
        );
    }
    if (bookings && bookings.length === 0) {
        return (
            <div className="alert alert-warning">
                You have no bookings created go to rentals section and book your
                place today.
                <Link
                    style={{ marginLeft: "10px" }}
                    className="btn btn-bwm"
                    to="/rentals"
                >
                    Available Rental
                </Link>
            </div>
        );
    } else {
        return <LoadingIcon></LoadingIcon>;
    }
}

const mapState = state => ({
    data: state.bookings,
});

export default connect(mapState, { fetchUserBookings, cleanUpBookings })(
    BookingManage
);
