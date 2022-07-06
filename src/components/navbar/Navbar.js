import classes from "./Navbar.module.css";
import NavCart from "./NavCart";

const Navbar = () => {
  return (
    <nav className={classes.header}>
      <h2>ReactMeal</h2>
      <NavCart></NavCart>
    </nav>
  );
}

export default Navbar;
