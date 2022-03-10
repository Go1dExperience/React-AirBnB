import bcrypt from "bcrypt"
import mongoose from "mongoose"
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        required: "Password is required",
    },
    email: {
        type: String,
        required: "Email is required",
        lowercase: true,
        unique: true,
    },
    // Rental this user has
    rentals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Rental",
        },
    ],
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
});
/////////////////////////////////////////////////////////////////////////////////////////
// COMPARE PASSWORDS
/////////////////////////////////////////////////////////////////////////////////////////
userSchema.methods.hasSamePassword = function (requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
};
/////////////////////////////////////////////////////////////////////////////////////////
// BEFORE SAVE, HASH THE PASSWORD
/////////////////////////////////////////////////////////////////////////////////////////
userSchema.pre("save", function (next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            user.password = hash;
            next();
        });
    });
});
export default mongoose.model("User", userSchema);
