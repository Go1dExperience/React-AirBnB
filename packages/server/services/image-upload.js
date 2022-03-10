import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config";

aws.config.update({
  secretAccessKey: config.SECRET_KEY,
  accessKeyId: config.ACCESS_KEY,
  region: "us-east-1",
});
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type: Only JPEG and PNG are allowed"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "alan-wake-bucket",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "Testing Metadata" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "." + "jpeg");
    },
  }),
});

export default upload;
