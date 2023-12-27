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
          <img src="/public/plus.svg"/>
          <input id="image-upload"type="file" multiple onChange={handleUpload} />
        </label>
      </form>
    </div>
  );
}
