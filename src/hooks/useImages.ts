import { useContext } from "react";
import { ImageEditContext } from "../context/ImageEditProvider";
import useAuth from "./useAuth";

export default function useImages() {
  const { headers } = useAuth();
  const { productId, urls, setUrls, staged, setStaged } =
    useContext(ImageEditContext);

  const uploadImage = async (image: File) => {
    // Prepare data
    const fd = new FormData();
    const fileUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });
    setStaged((prevStaged) => [...prevStaged, fileUrl]);
    fd.append("image", image);

    // Send data
    const res = await fetch(
      `http://localhost:3030/api/v1/products/${productId}/image`,
      {
        method: "POST",
        headers,
        body: fd,
      }
    );
    const uploadedUrl = await res.text();

    // Update view
    setUrls((prevUrls) => [...prevUrls, uploadedUrl]);
    setStaged((prevStaged) => prevStaged.filter((s) => s !== fileUrl));
  };

  return { urls, staged, uploadImage };
}
