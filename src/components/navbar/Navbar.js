import classes from "./Navbar.module.css";
import NavCart from "./NavCart";
import ReactIcon from "../UI/ReactIcon";

const Navbar = () => {
  return (
    <nav className={classes.header}>
      <div className={classes.title} >
        <ReactIcon></ReactIcon>
        <h2>ReactMeal</h2>
      </div>
      <NavCart></NavCart>
    </nav>
  );
}

export default Navbar;
