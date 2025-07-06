import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import TextField from "../components/TextField";

const Search = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);

  const searchForUsers = () => {
    console.log("Searching...");
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full mt-10 flex flex-col">
          <TextField
            title="Search"
            hint="Search by pin, email or even username then enter"
            setText={setSearchText}
            value={searchText}
            is_full
            doNextFunction={searchForUsers}
          />
          <div className="mt-10 flex flex-col">
            <Title title="Results" size="big" />
            <hr />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Search;
