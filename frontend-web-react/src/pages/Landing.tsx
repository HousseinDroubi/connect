import { useEffect } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);
  return (
    <>
      <Nav profile_url={data?.profile_url} />
    </>
  );
};

export default Landing;
