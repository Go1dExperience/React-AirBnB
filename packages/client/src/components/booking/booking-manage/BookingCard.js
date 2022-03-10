import React from "react";
import { Link } from "react-router-dom";
import { prettifyDate, toUpperCase } from "../../../helpers";

export default function BookingCard({ bookings }) {
    return bookings.map((booking, index) => {
        console.log(booking);
        return (
            <div className="col-md-4" key={index}>
                <div className="card text-center">
                    <div className="card-header">
                        {booking.rental
                            ? booking.rental.category
                            : "This property is deleted"}
                    </div>
                    <div className="card-block">
                        {booking.rental && (
                            <div>
                                <h4 className="card-title">
                                    {" "}
                                    {booking.rental.title} -{" "}
                                    {toUpperCase(booking.rental.city)}
                                </h4>
                                <p className="card-text booking-desc">
                                    {booking.rental.description}
                                </p>
                            </div>
                        )}

                        <p className="card-text booking-days">
                            {prettifyDate(booking.startAt)} -{" "}
                            {prettifyDate(booking.endAt)} | {booking.days} days
                        </p>
                        <p className="card-text booking-price">
                            <span>Price: </span>{" "}
                            <span className="booking-price-value">
                                {booking.totalPrice} $
                            </span>
                        </p>
                        {booking.rental && (
                            <Link
                                className="btn btn-bwm"
                                to={`/rentals/${booking.rental._id}`}
                            >
                                Go to Rental
                            </Link>
                        )}
                    </div>
                    <div className="card-footer text-muted">
                        Created at {prettifyDate(booking.createdAt)}
                    </div>
                </div>
            </div>
        );
    });
}
