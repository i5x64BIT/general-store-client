import { ChangeEvent, useRef, useState } from "react";
import useImages from "../../hooks/useImages";

export default function ImageUploader() {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { uploadImage } = useImages();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      for (let f of files) {
        uploadImage(f);
      }
    }
  };

  const button = (
    <img src="/public/plus.svg" onClick={() => setIsOpen(!isOpen)} />
  );
  return isOpen ? (
    <div>
      {button}
      <form>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleUpload}
        />
      </form>
    </div>
  ) : (
    button
  );
}
