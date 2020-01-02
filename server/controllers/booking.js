const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose');
const moment = require('moment');


exports.createBooking = function(req, res) {
    const {startAt, endAt, totalPrice, guests, days, rental} = req.body
// User was saved by User Controller. 
    const user = res.locals.user;
    const booking = new Booking({startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err, foundRental){
        if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)})
        }
// _id is an object, so when comparing we need to use id, which is a string
        if(foundRental.user.id === user.id){
            return res.status(422)
            .send({errors: [{title: 'Invalid User', detail:'Cannot book your own rental'}]})
        }
        if(validBooking(booking, foundRental)){
            booking.user = user;
            booking.rental = foundRental;
            foundRental.bookings.push(booking);
            
            booking.save(function(err) {
                if(err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)})
                }
                foundRental.save(); 
// Because saving here will cause pre-save hook in user model to change password
// we have to change it to update method
                User.updateOne({_id: user.id}, {$push: {
                    bookings: booking
                }
            }, function(err){
                console.log(err);
            })
        });       
        return res.json({startAt: booking.startAt, endAt: booking.endAt});
    }
        
        else {
            return res.status(422)
            .send({errors: [{title: 'Invalid Booking', detail:'This place is already booked on the chosen day'}]}) 
        }
    })
}
function validBooking(newbooking, rental) {
    let isValid = true;
    if(rental.bookings && rental.bookings.length > 0) {
// Every takes a logic, and makes sure all members pass that logic
        isValid =  rental.bookings.every(function(booking){
            const proposedStart = moment(newbooking.startAt);
            const proposedEnd = moment(newbooking.endAt);
            const realStart = moment(booking.startAt);
            const realEnd = moment(booking.endAt);
// New booking should be sooner, or later than old booking
// First if: later, second if: sooner
            return ((realStart<proposedStart && realEnd<proposedStart) || (proposedEnd<realEnd && proposedEnd<realStart))
        })
    }
    return isValid;
}


