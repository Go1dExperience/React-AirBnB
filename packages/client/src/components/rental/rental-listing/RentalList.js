import React from "react";
import RentalCard from "./RentalCard";

// import * as actions from '../../actions';

export default function RentalList(props) {
    const renderRentals = () => {
        return props.rentals.map((rental, index) => {
            return (
                <RentalCard
                    key={index}
                    ColNum="col-md-3 col-xs-6"
                    rental={rental}
                ></RentalCard>
            );
        });
    };
    return (
        <div>
            <div className="row">{renderRentals()}</div>
        </div>
    );
}
