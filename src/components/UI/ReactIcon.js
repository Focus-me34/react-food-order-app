import classes from "./ReactIcon.module.css";
import reactIcon from "../../assets/logo512.png";

const ReactIcon = () => {
  return (
    <img src={reactIcon} className={classes["react-icon"]} alt="react logo" />
  );
}

export default ReactIcon;
