import { useState } from "react";
import Spinner from "../Spinner";

export default function ImagesEditItem({
  url,
  loading,
  editable,
  deleteImageCallback,
}: {
  url: string;
  loading?: boolean;
  editable?: boolean;
  deleteImageCallback?: () => Promise<void>;
}) {
  const [hover, setHover] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  if (loading || isDelete)
    return (
      <div className="image-container">
        <img src={url} alt="" />
        <Spinner color={isDelete ? "red" : ""} />
      </div>
    );
  if (editable) {
    return hover ? (
      <div
        className="image-container"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <img src={url} />
        <img
          src="/public/trash.svg"
          className="cover"
          onClick={() => {
            setIsDelete(true);
            if (deleteImageCallback)
              deleteImageCallback().then(() => setIsDelete(false));
            else
              throw new TypeError(
                "MissingCallback: a deleteImage callback was not passed"
              );
          }}
        />
      </div>
    ) : (
      <img src={url} onMouseEnter={() => setHover(true)} />
    );
  }
  return <img src={url} />;
}
