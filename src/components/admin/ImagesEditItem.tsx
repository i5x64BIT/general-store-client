import { useState } from "react";
import Spinner from "../Spinner";

export default function ImagesEditItem({
  url,
  loading,
  editable,
}: {
  url: string;
  loading?: boolean;
  editable?: boolean;
}) {
  const [hover, setHover] = useState(false);

  if (loading)
    return (
      <div className="image-container">
        <img src={url} alt="" />
        <Spinner />
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
        <img src="/public/trash.svg" className="cover" />
      </div>
    ) : (
      <img src={url} onMouseEnter={() => setHover(true)} />
    );
  }
  return <img src={url} />;
}
