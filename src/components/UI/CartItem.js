import Button from "./Button";
import classes from "./CartItem.module.css"

const CartItem = (props) => {

  const removeItemHandler = (item) => {
    props.onChangeList(item, "remove")
  }

  const addItemHandler = (item) => {
    props.onChangeList(item, "add")
  }

  return (
    <div className={classes["cart-item"]}>
      <div>
        <h2>{props.itemName}</h2>
        <div className={classes.summary}>
          <p className={classes.price}>{props.itemPrice}</p>
          <p className={classes.amount}>x {props.itemQuantity}</p>
        </div>
      </div>
      <div className={classes.actions}>
        <Button onClick={() => removeItemHandler(props.item)}>-</Button>
        <Button onClick={() => addItemHandler(props.item)}>+</Button>
      </div>
    </div>
  );
}

export default CartItem;
