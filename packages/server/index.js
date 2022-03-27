import express from "express";
import mongoose from "mongoose";
import path from "path";
import { config } from "./config";
import FakeDb from "./fake-db";
import { rentalRoutes, bookingRoutes, userRoutes, imageRoutes } from "./routes";

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
      const fakeDb = new FakeDb();
      // fakeDb.seedDB();
    }
  })
  .catch(err => {
    console.log(err);
  });
const app = express();
app.use(express.json());

app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1", imageRoutes);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "build");
  app.use(express.static(appPath));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Connected to port: ", PORT);
});
