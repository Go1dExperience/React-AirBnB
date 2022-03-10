import React, { useEffect, useState } from "react";
import { fetchUserRentals, deleteRental } from "../../../actions";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import RentalManageCard from "./RentalManageCard";
import LoadingIcon from "../../shared/LoadingIcon";

export default function RentalManage() {
    // If we set rentals to [], it will always fall into second if, so we need to give it null and
    // reset it to null when leaving
    const [rentals, setRentals] = useState();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetchUserRentals()
            .then(rentals => setRentals(rentals))
            .catch(errors => setErrors(errors));
        return () => {
            setRentals(null);
        };
    }, []);
    const renderRentalCard = () => {
        return rentals.map((rental, index) => (
            <RentalManageCard
                deleteThisRental={deleteThisRental}
                key={index}
                rental={rental}
            ></RentalManageCard>
        ));
    };
    const deleteThisRental = rentalId => {
        deleteRental(rentalId)
            .then(res =>
                setRentals([
                    ...rentals.filter(rental => rental._id !== rentalId),
                ])
            )
            .catch(errors => toast.error(errors[0].detail));
    };
    if (rentals && rentals.length > 0) {
        return (
            <section id="userRentals">
                <ToastContainer></ToastContainer>
                <h1 className="page-title">My Rentals</h1>
                <div className="row">{renderRentalCard()}</div>
            </section>
        );
    }
    if (rentals && rentals.length === 0) {
        return (
            <div className="alert alert-warning">
                You dont have any rentals currenty created. If you want
                advertised your property please follow this link.
                <Link
                    style={{ marginLeft: "30px" }}
                    className="btn btn-bwm"
                    to="/rentals/create"
                >
                    Register Rental
                </Link>
            </div>
        );
    }
    if (errors && errors.length > 0) {
        console.log(errors);
        return <h1>Errors</h1>;
    } else {
        return <LoadingIcon></LoadingIcon>;
    }
}
