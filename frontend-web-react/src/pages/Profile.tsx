import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import ProfileComponent from "../components/Profile";
import TextField from "../components/TextField";
import Button from "../components/Button";

const Profile = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const [image, setImage] = useState<File | string | null>(null);
  const [usernameText, setUsernameText] = useState<string>("");

  useEffect(() => {
    if (data === null) {
      navigate("/");
    } else {
      setImage(data?.profile_url as string);
      setUsernameText(data?.username || "");
    }
  }, [data]);

  const updateUserData = () => {
    console.log(image);
    console.log(usernameText);
  };

  return (
    <>
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-screen flex justify-center">
        <section className="w-3/4 h-full mt-10">
          <Title title="Edit Profile" size="big" />
          <article className="w-full flex flex-col items-center">
            <ProfileComponent image={image} setImage={setImage} />
            <div className="mt-5">
              <TextField
                title="Username"
                hint="Enter your username"
                value={usernameText}
                setText={setUsernameText}
              />
            </div>
            <div className="mt-8">
              <Button button_text="Save changes" fn={updateUserData} />
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default Profile;
