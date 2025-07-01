import Logo from "./Logo";
import Title from "./Title";
import SearchIcon from "../assets/search.png";
import MessageIcon from "../assets/message.png";
import ProfileIcon from "../assets/profile_default.png";
import { NavComponentInterface } from "../interfaces/components/components.interfaces";
import { useNavigate } from "react-router-dom";

const Nav: React.FC<NavComponentInterface> = ({ profile_url }) => {
  const navigate = useNavigate();

  const navigateTo = (path: "landing" | "search" | "profile") => {
    navigate(`/${path}`);
  };
  return (
    <nav className="flex flex-col">
      <article className="flex justify-between pl-8 pr-8 pt-5">
        <section className="flex items-center w-36 justify-between">
          <Title title="Connect" size="medium" />
          <Logo />
        </section>
        <section className="flex items-center w-40 justify-between">
          <div
            className="cursor-pointer size-9"
            onClick={() => navigateTo("landing")}
          >
            <img src={MessageIcon} alt="message" title="conversations" />
          </div>
          <div
            className="cursor-pointer size-9"
            onClick={() => navigateTo("search")}
          >
            <img src={SearchIcon} alt="search" title="Find someone" />
          </div>
          <div
            className="cursor-pointer size-10"
            onClick={() => navigateTo("profile")}
          >
            <img
              className="rounded-full h-full w-full"
              src={profile_url || ProfileIcon}
              alt="profile"
              title="Visit profile"
            />
          </div>
        </section>
      </article>
      <hr className="mt-2 bg-black" />
    </nav>
  );
};

export default Nav;
