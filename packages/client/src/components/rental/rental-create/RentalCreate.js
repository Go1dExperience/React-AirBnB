import React, { useState } from "react";
import RentalCreateForm from "./RentalCreateForm";
import { createRental } from "../../../actions";
import { withRouter } from "react-router-dom";
function RentalCreate(props) {
    const [errors, setErrors] = useState([]);
    const { history } = props;
    const createNewRental = values => {
        createRental(values)
            .then(res => history.push("/rentals"))
            .catch(err => {
                setErrors(err);
            });
    };

    const rentalCategories = ["Apartment", "Shared", "Condo"];
    return (
        <section id="newRental">
            <div className="bwm-form">
                <div className="row">
                    <div className="col-md-5">
                        <h1 className="page-title">Create Rental</h1>
                        <RentalCreateForm
                            errors={errors}
                            createNewRental={createNewRental}
                            options={rentalCategories}
                        ></RentalCreateForm>
                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="image-container">
                            <h2 className="catchphrase">
                                Hundreds of awesome places in reach of few
                                clicks.
                            </h2>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/image/create-rental.jpg"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </section>
    );
}
export default withRouter(RentalCreate);
