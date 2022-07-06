import classes from "./Button.module.css"

const Button = (props) => {
  return (
    <button className={`${props.className} + ${classes.button}`} onClick={props.onClick} type={props.type} action={props.action} item={props.item}>{props.children}</button>
  );
}

export default Button;
