import { useCallback, useContext } from "react";
import { ImageEditContext } from "../context/ImageEditProvider";
import useAuth from "./useAuth";

export default function useImages() {
  const { headers } = useAuth();
  const { productId, urls, setUrls, staged, setStaged } =
    useContext(ImageEditContext);

  const uploadImage = useCallback(async (image: File) => {
    // Prepare data
    const fd = new FormData();
    const fileUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });
    setStaged((prevStaged) => [
      ...prevStaged,
      {
        fileUrl,
        status: "loading",
      },
    ]);
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
    if (res.ok) {
      const uploadedUrl = await res.text();

      // Update view
      setUrls((prevUrls) => [...prevUrls, uploadedUrl]);
      setStaged((prevStaged) => {
        return prevStaged.filter((s) => s.fileUrl !== fileUrl);
      });
    } else {
      setStaged((pervStaged) => {
        let foundIndex = 0;
        const found = pervStaged.find((s, i) => {
          foundIndex = i;
          return s.fileUrl === fileUrl;
        });
        found!.status = "failed";
        return [
          ...pervStaged.slice(0, foundIndex),
          found!,
          ...pervStaged.slice(foundIndex + 1),
        ];
      });
    }
  }, [urls, staged]);
  const deleteImage = useCallback(async (imageIndex: number) => {
    const res = await fetch(
      `http://localhost:3030/api/v1/products/${productId}/image/${imageIndex}`,
      {
        method: "DELETE",
        headers,
      }
    );
    if (res.ok) {
      setUrls((prevUrls) => [
        ...prevUrls.slice(0, imageIndex),
        ...prevUrls.slice(imageIndex + 1),
      ]);
    }
  }, [urls]);

  return { urls, staged, uploadImage, deleteImage };
}
