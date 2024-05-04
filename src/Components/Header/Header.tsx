import SeachInput from "../Input/SeachInput";
import marvelLogo from "../../assets/icons/marvel.svg";

const Header = ({ setPage }: { setPage: any }) => {
  return (
    <>
      <div className="flex items-center justify-around bg-red-600 p-1">
        <div onClick={() => location.reload()} className="cursor-pointer">
          <img width={100} src={marvelLogo} alt="logo" />
        </div>
        <SeachInput setPage={setPage} />
      </div>
    </>
  );
};

export default Header;
