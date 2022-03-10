import React from "react";
import { Link } from "react-router-dom";
import { rentalType } from "../../../helpers";
export default function RentalCard(props) {
    const { rental } = props;
    return (
        <div className={props.ColNum}>
            <Link to={`/rentals/${rental._id}`} className="rental-detail-link">
                <div className="card bwm-card">
                    <img
                        className="image-card"
                        src={rental.image}
                        alt="Rental Main"
                    ></img>
                    <div className="card-block">
                        <h6 className={`card-subtitle ${rental.category}`}>
                            {rentalType(rental.shared)} {rental.category} &#183;{" "}
                            {rental.city}{" "}
                        </h6>
                        <h4 className="card-title">{rental.title}</h4>
                        <p className="card-text">
                            ${rental.dailyRate} per Night &#183; Free
                            Cancelation
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
