import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toUpperCase, prettifyDate } from "../../../helpers";
import RentalManageModal from "./RentalManageModal";

export default function RentalManageCard(props) {
    const { rental, deleteThisRental } = props;
    const [del, setDel] = useState(false);

    const showDelete = () => {
        setDel(true);
    };
    const hideDelete = () => {
        setDel(false);
    };
    const deleteClass = del ? "tobeDeleted" : "";
    const deleteRental = rentalId => {
        setDel(false);
        deleteThisRental(rentalId);
    };

    return (
        <div className="col-md-4">
            <div className={`card text-center ${deleteClass}`}>
                <div className="card-block">
                    <h4 className="card-title">
                        {rental.title} - {toUpperCase(rental.city)}
                    </h4>
                    <Link className="btn btn-bwm" to={`/rentals/${rental._id}`}>
                        Go to Rental
                    </Link>
                    {rental.bookings && rental.bookings.length > 0 && (
                        <RentalManageModal
                            bookings={rental.bookings}
                        ></RentalManageModal>
                    )}
                </div>
                <div className="card-footer text-muted">
                    Created at {prettifyDate(rental.createdAt)}
                    {!del && (
                        <button onClick={showDelete} className="btn btn-danger">
                            Delete
                        </button>
                    )}
                    {del && (
                        <div className="delete-menu">
                            Do You Confirm ?
                            <button
                                onClick={() => deleteRental(rental._id)}
                                className="btn btn-danger"
                            >
                                Yes
                            </button>
                            <button
                                onClick={hideDelete}
                                className="btn btn-primary"
                            >
                                No
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
