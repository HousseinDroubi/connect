import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import TextField from "../components/TextField";
import { searchForUsersApi } from "../services/apis/search_for_users";
import { searchForUsersResponseInterface } from "../interfaces/responses/search_for_users";
import { showLoading, showPopupText } from "../services/helpers/popup_helper";
import { popupComponentInterface } from "../interfaces/components/popup_interface";
import Popup from "../components/Popup";
import axios from "axios";

const Search = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const [searchText, setSearchText] = useState<string>("");
  const [usersSearch, setUsersSearch] =
    useState<searchForUsersResponseInterface>({ users: [] });
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);

  const searchForUsers = async () => {
    if (searchText === "") {
      showPopupText(
        setPopupProps,
        "Add pin, email or username then enter to search"
      );
      return;
    }
    try {
      showLoading(setPopupProps, true);
      const { data: responseData } = await searchForUsersApi({
        content: searchText,
        token: data!.token,
      });
      setUsersSearch(responseData);
      showLoading(setPopupProps, false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }
        if (error.status === 401) {
          showPopupText(
            setPopupProps,
            "Session ended. Please login again.",
            () => {
              navigate("/");
            }
          );
          return;
        }
      }
      showPopupText(setPopupProps, "Something went wrong");
    }
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
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default Search;
