import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import useAuth from "../hooks/useAuth";
type StagedType = { fileUrl: string; status: "loading" | "failed" };
type ImageEditContextType = {
  productId: string;
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
  staged: StagedType[];
  setStaged: Dispatch<SetStateAction<StagedType[]>>;
};
export const ImageEditContext = createContext<ImageEditContextType>(
  {} as ImageEditContextType
);

export function ImageEditProvider({
  children,
  productId,
}: {
  children: ReactNode;
  productId: string;
}) {
  const [urls, setUrls] = useState<string[]>([]);
  const [staged, setStaged] = useState<StagedType[]>([]);
  const { headers } = useAuth();

  useEffect(() => {
    _fetchImages();
  }, []);
  const _fetchImages = async () => {
    const res = await fetch(
      `http://localhost:3030/api/v1/products/${productId}/images`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await res.json();
    setUrls(data);
  };
  return (
    <ImageEditContext.Provider
      value={{ productId, urls, setUrls, staged, setStaged }}
    >
      {children}
    </ImageEditContext.Provider>
  );
}
