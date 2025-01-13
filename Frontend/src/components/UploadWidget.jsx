/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const UploadWidget = (props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnurzyftz",
        uploadPreset: "uw_test",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          props.onImageUpload(result.info.secure_url);
        }
      }
    );
  });

  return (
    <button
      type="button"
      className="w-fit mx-auto font-medium rounded-lg text-sm flex justify-center px-5 py-2.5 text-center"
      onClick={() => widgetRef?.current?.open()}
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;
