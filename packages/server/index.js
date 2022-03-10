import express from "express"
import mongoose from "mongoose";
import path from "path"
import { config } from './config'
import FakeDb from "./fake-db";

import rentalRoutes from "./routes/rentals";
import userRoutes from "./routes/users";
import bookingRoutes from "./routes/booking";
import imageUploadRoute from "./routes/image-upload";
console.log(config)
// Connect to mongoose
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
// App Init
const app = express();
// Body Parser
app.use(express.json());
// Routing
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1", imageUploadRoute);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "build");
  app.use(express.static(appPath));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

// Port
const PORT = process.env.PORT || 3001;
// Listening
app.listen(PORT, () => {
  console.log("Connected to ", PORT);
});
