import { handleImageFunctionInterface } from "../interfaces/utils/functions";

const handleImage = ({
  image,
  setImage,
  setPreviewURL,
}: handleImageFunctionInterface) => {
  if (image && typeof image === "object" && image.type.startsWith("image/")) {
    setImage(image);

    const preview = URL.createObjectURL(image);
    setPreviewURL(preview);
  }
};

const objectToFormData = (object: any): FormData => {
  const formData = new FormData();
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      formData.append(key, object[key]);
    }
  }
  return formData;
};

export { handleImage, objectToFormData };
