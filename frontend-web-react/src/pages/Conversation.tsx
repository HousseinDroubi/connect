import { useEffect } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";

const Conversation = () => {
  const navigate = useNavigate();
  const { data } = useUserData();

  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full mt-10"></section>
      </div>
    </div>
  );
};

export default Conversation;
