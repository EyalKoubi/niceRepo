import { Link } from "react-router-dom";
import "../CSS/MainNavbar.css";

const MainNavbar = () => {
  return (
    <nav className="some">
      <div className="links">
        <Link to="/groups">Groups</Link>
        <Link to="/persons">Persons</Link>
        <Link to="/common">Common</Link>
      </div>
    </nav>
  );
};

export default MainNavbar;
