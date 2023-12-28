import { ChangeEvent } from "react";
import useImages from "../../hooks/useImages";
import "./ImageUpload.scss";

export default function ImageUploader() {
  const { uploadImage } = useImages();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      for (let f of files) {
        uploadImage(f);
      }
    }
  };
  return (
    <div className="image-upload">
      <form>
        <label htmlFor="image-upload">
          <svg
            className="plus"
            enableBackground="new 0 0 50 50"
            height="50px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 50 50"
            width="50px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect fill="none" height="50" width="50" />
            <line
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              strokeWidth="4"
              x1="9"
              x2="41"
              y1="25"
              y2="25"
            />
            <line
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              strokeWidth="4"
              x1="25"
              x2="25"
              y1="9"
              y2="41"
            />
          </svg>
          <input
            id="image-upload"
            type="file"
            multiple
            onChange={handleUpload}
          />
        </label>
      </form>
    </div>
  );
}
