import { profileComponentInterface } from "../interfaces/components/components.interfaces";
import DefaultImageIcon from "../assets/profile_default.png";
import AddImageIcon from "../assets/add_image.png";
import { handleImage } from "../utils/functions";
import { useEffect, useState } from "react";
const Profile: React.FC<profileComponentInterface> = ({ image, setImage }) => {
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const showImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files !== null ? event.target.files[0] : null;
    handleImage({ image: file, setImage, setPreviewURL });
  };

  return (
    <div className="size-28 bg-blacsk">
      <label className="relative cursor-pointer" htmlFor="input_image">
        <section className="size-28 rounded-full border-[0.5px] border-blue flex items-center justify-center">
          <img src={image && previewURL ? previewURL : DefaultImageIcon} />
        </section>
        <section className="absolute right-0 bottom-2">
          <img src={AddImageIcon} height={23} width={23} />
        </section>
        <input
          className="hidden"
          type="file"
          id="input_image"
          accept="image/*"
          onChange={showImage}
        />
      </label>
    </div>
  );
};

export default Profile;
