import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import { toast, ToastContainer } from "react-toastify";
import { uploadImage } from "../../../actions";

export default function BwmFileUpload(props) {
  // Image source
  const [imgSrc, setImgSrc] = useState();
  // Initial Crop
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
  });
  // File for upload
  const [file, setFile] = useState();
  // File cropped
  // const [croppedFile, setCroppedFile] = useState();
  // Keep the image value of onLoad
  const [imgRef, setImgRef] = useState();
  // The result of cropping - this is to display and not upload
  const [croppedImgageUrl, setCroppedImg] = useState();
  // Extra UI
  // Status of upload(successfull or not)
  const [uploadStatus, setUploadStatus] = useState("INIT");
  // Uploaded => Disable new upload
  const [uploaded, setUploaded] = useState(true);

  var fileURL;
  const {
    input: { onChange },
  } = props;
  ////////////////////Cropping Funtionality////////////////////
  const onSelectFile = event => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
      setFile(event.target.files[0]);
      setUploadStatus("INIT");
    }
  };
  // Button to upload
  const uploadThisImage = () => {
    if (file) {
      setUploadStatus("INIT");
      uploadImage(file)
        .then(image => {
          setUploadStatus("OK");
          onChange(image);
          setUploaded(false);
        })
        .catch(err => {
          setUploadStatus("FAIL");
          console.log(err);
          setUploaded(true);
        });
    }
  };

  const onImageLoad = image => {
    if (image.naturalWidth < 750 && image.naturalHeight < 750) {
      toast.error("Minumum resolution must be 750x750 px");
      setImgSrc(undefined);
      setFile(undefined);
      setCroppedImg(undefined);
    }
    setImgRef(image);
    const newCrop = { x: 10, y: 10, aspect: 16 / 9, width: 300 };
    setCrop(newCrop);
    return false;
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async crop => {
    if (imgRef && crop.width && crop.height) {
      // Result includes a fileURL needed to display image - attached to croppedImgURL, and a blob
      // needed to upload - attached to croppedFile
      const { fileURL, blob } = await getCroppedImg(
        imgRef,
        crop,
        "newfile.jpeg"
      );
      // Convert the blob part into a jpeg file
      const croppedFile = new File([blob], "newfile.jpeg", {
        type: "image/jpeg",
      });
      setCroppedImg(fileURL);
      setFile(croppedFile);
    }
  };
  // Get a crop Image
  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          blob.name = fileName;
          URL.revokeObjectURL(fileURL);
          fileURL = URL.createObjectURL(blob);
          resolve({ fileURL, blob });
        },
        "image/jpeg",
        1
      );
    });
  };
  ////////////////////Extra UI////////////////////
  // Show Upload Image status
  const renderUploadStatus = () => {
    if (uploadStatus === "OK") {
      return (
        <div className="alert alert-success"> Image Uploaded Successfully </div>
      );
    }
    if (uploadStatus === "FAIL") {
      return (
        <div className="alert alert-danger">Failed To Upload This Image</div>
      );
    }
  };
  ////////////////// Render///////////////////////
  const {
    label,
    meta: { touched, error },
  } = props;
  return (
    <div>
      <ToastContainer />
      <div className="img-upload-container">
        <div className="form-group">
          <label>{label}</label>
          {uploaded && (
            <input
              type="file"
              accept=".jpeg, .png, .jpg"
              className="form-control-file"
              onChange={onSelectFile}
            />
          )}
        </div>
        {imgSrc && uploaded && (
          <ReactCrop
            src={imgSrc}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoad}
            onComplete={onCropComplete}
            onChange={onCropChange}
          />
        )}
        {touched && error && <div className="alert alert-danger">{error}</div>}
        {croppedImgageUrl && (
          <img
            alt="Crop"
            style={{ maxWidth: "100%" }}
            src={croppedImgageUrl}
          ></img>
        )}
        {file && uploaded && (
          <button
            className="btn btn-bwm btn-upload"
            type="button"
            disabled={!file}
            onClick={() => uploadThisImage()}
          >
            Choose this image
          </button>
        )}
        {renderUploadStatus()}
      </div>
    </div>
  );
}
