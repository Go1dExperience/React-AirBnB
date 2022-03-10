import express from "express";
import { authMiddleware } from "../controllers/user";
import upload from "../services/image-upload";

const router = express.Router();
const singleUpload = upload.single("image");

router.post("/image/upload", authMiddleware, function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      console.log({ err });
      return res.status(422).send({
        errors: [{ title: "Upload Error", detail: err.message }],
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

export const imageRoutes = router;
