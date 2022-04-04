import express from "express";
import { User, Rental } from "../models";
import { authMiddleware } from "../controllers";
import { normalizeErrors, validateErrors } from "../helpers/mongoose";
import { createRentalValidation } from "../validators/validator";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/secret", authMiddleware, (req, res) => {
  res.json({ secret: true });
});
// Remember placeholder should be last in order
router.get("/manage", authMiddleware, function (req, res) {
  const user = res.locals.user;
  // Wherer is like findOne with user query
  Rental.where({ user })
    .populate("bookings")
    .exec(function (err, rentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(rentals);
    });
});

router.get("/:id", (req, res) => {
  Rental.findById(req.params.id)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({
          errors: [
            {
              title: "Rental Error!",
              detail: "Cound not find Rental",
            },
          ],
        });
      }
      res.json(foundRental);
    });
});

router.get("", (req, res) => {
  const city = req.query.city;
  const query = city
    ? {
        city: {
          $regex: city.toLowerCase(),
        },
      }
    : {};

  Rental.find(query)
    .select("-bookings")
    .exec(function (err, rentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (city && rentals.length === 0) {
        return res.status(422).send({
          errors: [
            {
              title: "No Rentals Found!",
              detail: `Oops! No properties could be found in ${city}`,
            },
          ],
        });
      }
      return res.json(rentals);
    });
});

router.post("", authMiddleware, createRentalValidation, (req, res) => {
  const {
    title,
    city,
    category,
    street,
    image,
    bedrooms,
    shared,
    description,
    dailyRate,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: validateErrors(errors.errors) });
  } else {
    const user = res.locals.user;
    const rental = new Rental({
      title,
      city,
      category,
      street,
      image,
      bedrooms,
      shared,
      description,
      dailyRate,
    });
    rental.user = user;
    Rental.create(rental, function (err, rental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      User.updateOne(
        { _id: user.id },
        { $push: { rentals: rental } },
        function (err) {}
      );
      return res.json(rental);
    });
  }
});

router.delete("/:id", authMiddleware, function (req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user", "_id")
    .populate({
      path: "bookings",
      select: "startAt",
      match: {
        startAt: { $gt: new Date() },
      },
    })
    .exec(function (err, rental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      // If not your own rental
      if (user.id !== rental.user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Unable to delete this property",
              detail: "Cannot delete properties you do not own",
            },
          ],
        });
      }
      // If active bookings
      if (rental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: "Active bookings found",
              detail: "This property has active bookings",
            },
          ],
        });
      }
      rental.remove(function (err, rental) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json({ Deleted: true });
      });
    });
});

export const rentalRoutes = router;
