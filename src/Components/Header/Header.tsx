import SeachInput from "../common/SeachInput";
import marvelLogo from "../../assets/icons/marvel.svg";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-around bg-red-600 p-1">
        <div>
          <img width={100} src={marvelLogo} alt="logo" />
        </div>
        <SeachInput />
      </div>
    </>
  );
};

export default Header;
