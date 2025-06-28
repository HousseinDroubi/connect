import { handleImageFunctionInterface } from "../interfaces/utils/functions";

const handleImage = ({
  image,
  setImage,
  setPreviewURL,
}: handleImageFunctionInterface) => {
  if (image && image.type.startsWith("image/")) {
    setImage(image);

    const preview = URL.createObjectURL(image);
    setPreviewURL(preview);
  }
};

export { handleImage };
