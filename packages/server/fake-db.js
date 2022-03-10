import { Booking, User, Rental } from "./models";
import fakeData from "./data.json";

class FakeDb {
  constructor() {
    this.rentals = fakeData.rentals;
    this.users = fakeData.users;
  }
  async cleanDB() {
    await User.deleteMany({});
    await Rental.deleteMany({});
    await Booking.deleteMany({});
  }
  pushDataToDb() {
    let user = new User(this.users[0]);
    let user1 = new User(this.users[1]);
    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);

      newRental.save();
    });
    user.save();
    user1.save();
  }
  async seedDB() {
    await this.cleanDB();
    this.pushDataToDb();
  }
}

export default FakeDb;
