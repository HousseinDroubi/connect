import { profileComponentInterface } from "../interfaces/components/components.interfaces";
import DefaultImageIcon from "../assets/profile_default.png";
import AddImageIcon from "../assets/add_image.png";
const Profile: React.FC<profileComponentInterface> = ({ image, setImage }) => {
  return (
    <div className="size-28 bg-blacsk">
      <label className="relative cursor-pointer" htmlFor="input_image">
        <section className="size-28 rounded-full border-[0.5px] border-blue flex items-center justify-center">
          {!image && <img src={DefaultImageIcon} />}
        </section>
        <section className="absolute right-0 bottom-2">
          <img src={AddImageIcon} height={23} width={23} />
        </section>
        <input className="hidden" type="file" id="input_image" />
      </label>
    </div>
  );
};

export default Profile;
