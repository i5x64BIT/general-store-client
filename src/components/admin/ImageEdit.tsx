import { useEdit } from "../../hooks/useEdit";
import "./ImageEdit.scss";
import ImagesEditItem from "./ImagesEditItem";
import ImageUpload from "./ImageUpload";
import useImages from "../../hooks/useImages";
export default function ImagesEdit({
  item,
  prop,
}: {
  item: any;
  prop: string;
}) {
  const { editProp, editItem } = useEdit();
  const { staged, urls, deleteImage } = useImages();

  let items = urls.map((imageUrl: string) => (
    <ImagesEditItem key={imageUrl} url={imageUrl} />
  ));
  if (editItem?._id === item._id && editProp === prop) {
    items = urls.map((imageUrl: string) => (
      <ImagesEditItem
        key={imageUrl}
        url={imageUrl}
        editable
        deleteImageCallback={() => deleteImage(urls.indexOf(imageUrl))}
      />
    ));
    items.unshift(<ImageUpload key={editItem._id + "upload"} />)
  }
  staged.length &&
  staged.forEach((s) => {
    items.push(
      <ImagesEditItem
        key={s.fileUrl + s.status}
        url={s.fileUrl}
        status={s.status}
      />
    );
  });
  return <div className="images">{items}</div>;
}
