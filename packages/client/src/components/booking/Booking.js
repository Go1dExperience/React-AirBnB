import React, { useCallback, useMemo, useState, useRef } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { ToastContainer, toast } from "react-toastify";
import { getRangeOfDates } from "../../helpers";
import moment from "moment";
import BookingModal from "./BookingModal";
import { createBooking } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Booking(props) {
    const {
        rental,
        auth: { isAuth },
        path,
    } = props;
    // Path is passed from RentalDetail to know where the previous page was
    const { bookings } = rental;

    // Create newBooking state
    const [newBooking, setNewBooking] = useState({
        startAt: "",
        endAt: "",
        guests: "",
    });
    // Open State for Modal
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    // Create Ref for input
    const bookingRef = useRef(null);
    // Loop through all booked periods, return array of all booked dates
    const getBookedDates = useCallback(() => {
        let booked = [];
        if (bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                // For each booking, we get an array of all the days between start and end,
                // bookedDate is the total of all bookings, while dateRange is for each booking
                const dateRange = getRangeOfDates(
                    booking.startAt,
                    booking.endAt,
                    "Y/MM/DD"
                );
                booked.push(...dateRange);
            });
        }
        return booked;
    }, [bookings]);
    // Don't calculate bookedDates again, unless bookings changes
    // let bookedDates = getBookedDates();
    let bookedDates = useMemo(() => getBookedDates(), [getBookedDates]);
    // Run this through every day in the calenda as 'date', check if bookedDates contains it,
    // Or if it is earlier than today
    const checkInvalidDate = date => {
        if (bookedDates && bookedDates.length > 0) {
            return (
                // If date is in bookedDates or not
                bookedDates.includes(date.format("Y/MM/DD")) ||
                // Takes date, minus today, if < 0 => date is in the past => disabled
                date.diff(moment(), "days") < 0
            );
        } else {
            return date.diff(moment(), "days") < 0;
        }
    };
    // Handle Apply event
    const handleApply = (event, picker) => {
        const startAt = picker.startDate.format("Y/MM/DD");
        const endAt = picker.endDate.format("Y/MM/DD");
        setNewBooking({ ...newBooking, startAt, endAt });
        bookingRef.current.value = startAt + " - " + endAt;
    };
    // Handle Guest Select
    const selectGuests = event => {
        setNewBooking({ ...newBooking, guests: parseInt(event.target.value) });
    };
    // Click Book
    const confirmData = () => {
        const { startAt, endAt } = newBooking;
        const days = getRangeOfDates(startAt, endAt).length - 1;
        setNewBooking({
            ...newBooking,
            days,
            totalPrice: rental.dailyRate * days,
            rental,
        });
        setOpen(true);
    };
    const cancelConfirm = () => {
        setOpen(false);
    };
    const bookRental = () => {
        createBooking(newBooking)
            .then(booking => {
                newBookedDate(booking);
                setOpen(false);
                bookingRef.current.value = "";
                setNewBooking({
                    ...newBooking,
                    guests: "",
                    startAt: "",
                    endAt: "",
                });
                toast.success(
                    "Booking has been successfully created! Enjoy your stay"
                );
            })
            .catch(errors => {
                setErrors(errors);
            });
    };
    // bookRental returns start and end day as res, so we want to disable these days immidiately
    const newBookedDate = booking => {
        const newlybookedDates = getRangeOfDates(
            booking.startAt,
            booking.endAt
        );
        bookedDates.push(...newlybookedDates);
    };
    const { startAt, endAt, guests } = newBooking;

    return (
        <div className="booking">
            <ToastContainer></ToastContainer>
            <h3 className="booking-price">
                $ {rental.dailyRate}{" "}
                <span className="booking-per-night">per night</span>
            </h3>
            <hr></hr>
            {!isAuth && (
                <Link
                    className="btn btn-bwm btn-confirm btn-block"
                    to={{ pathname: "/login", state: { from: path } }}
                >
                    Login to book a place right now!
                </Link>
            )}
            {isAuth && (
                <React.Fragment>
                    <div className="form-group">
                        <label htmlFor="dates">Dates</label>
                        <DateRangePicker
                            opens="left"
                            isInvalidDate={checkInvalidDate}
                            containerStyles={{ display: "block" }}
                            onApply={handleApply}
                        >
                            <input
                                ref={bookingRef}
                                id="dates"
                                type="text"
                                className="form-control"
                            ></input>
                        </DateRangePicker>
                    </div>
                    <div className="form-group">
                        <label htmlFor="guests">Guests</label>
                        <input
                            onChange={event => selectGuests(event)}
                            type="number"
                            min="0"
                            value={guests}
                            className="form-control"
                            id="guests"
                            aria-describedby="guests"
                            placeholder=""
                        ></input>
                    </div>
                    <button
                        disabled={!startAt || !endAt || !guests || guests < 0}
                        onClick={() => confirmData()}
                        className="btn btn-bwm btn-confirm btn-block"
                    >
                        Reserve place now
                    </button>
                </React.Fragment>
            )}
            <hr></hr>
            <p className="booking-note-title">
                People are interested into this house
            </p>
            <p className="booking-note-text">
                More than 500 people checked this rental last month.
            </p>
            <BookingModal
                rentalPrice={rental.dailyRate}
                errors={errors}
                bookRental={bookRental}
                booking={newBooking}
                closeModal={cancelConfirm}
                open={open}
            ></BookingModal>
        </div>
    );
}
const mapState = state => ({
    auth: state.auth,
});

export default connect(mapState)(Booking);
