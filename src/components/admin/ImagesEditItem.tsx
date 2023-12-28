import { useState } from "react";
import Spinner from "../Spinner";
import WarningIcon from "./WarningIcon";

export default function ImagesEditItem({
  url,
  editable,
  status,
  deleteImageCallback,
}: {
  url: string;
  editable?: boolean;
  status?: string;
  deleteImageCallback?: () => Promise<void>;
}) {
  const [hover, setHover] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  if (status === "loading" || isDelete) {
    return (
      <div className="image-container">
        <img src={url} alt="" className="loading" />
        <Spinner color={isDelete ? "red" : ""} />
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="image-container">
        <img src={url} alt="" className="loading" />
        <WarningIcon color="yellow" className="cover" />
      </div>
    );
  }
  if (editable) {
    return hover ? (
      <div
        className="image-container"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <svg
          className="cover trash"
          onClick={() => {
            setIsDelete(true);
            if (deleteImageCallback)
              deleteImageCallback().then(() => setIsDelete(false));
            else
              throw new TypeError(
                "MissingCallback: a deleteImage callback was not passed"
              );
          }}
          data-name="Layer 1"
          height="200"
          id="Layer_1"
          viewBox="0 0 200 200"
          width="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M170,47.5H30a10,10,0,0,0,0,20h5.5l9,88a29.91,29.91,0,0,0,30,27h51c15.5,0,28-11.5,30-27l9-88H170a10,10,0,0,0,0-20Zm-34.5,106a10.23,10.23,0,0,1-10,9h-51a10.23,10.23,0,0,1-10-9l-9-86h89l-9,86Zm-50.5-6a10,10,0,0,0,10-10V90a10,10,0,0,0-20,0v47.5A10,10,0,0,0,85,147.5Zm30,0a10,10,0,0,0,10-10V90a10,10,0,0,0-20,0v47.5A10,10,0,0,0,115,147.5ZM85,37.5h27.5a10,10,0,0,0,0-20H85a10,10,0,0,0,0,20Z" />
        </svg>
        <img src={url} />
      </div>
    ) : (
      <div className="image-container">
        <img src={url} onMouseEnter={() => setHover(true)} />
      </div>
    );
  }
  return (
    <div className="image-container">
      <img src={url} />
    </div>
  );
}
