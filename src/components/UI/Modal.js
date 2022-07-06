import ReactDom from "react-dom";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart-context";
import classes from "./Modal.module.css";
import CartItem from "./CartItem";
import Button from "./Button";
// import _ from "lodash"

let styles = `${classes.modal}`

const Backdrop = (props) => {
  const closeModalHandler = () => {
    styles += " d-none";
    props.onCloseModal();
  }
  return (<div className={classes.backdrop} onClick={closeModalHandler}></div>)
}

const ModalContent = (props) => {
  const ctx = useContext(CartContext)
  const [itemWithQuantityIterable, setItemWithQuantityIterable] = useState([])

  // ! TRANSFORM THE ITEM ARRAY INTO AN OBJECT WITH ITEM / QUANTITY
  const getItemQuantity = (items) => {
    const objItemWithQuantity = {}

    items.forEach(item => {
      if (objItemWithQuantity.hasOwnProperty(item.name)) {
        objItemWithQuantity[item.name].quantity += 1
      } else {
        objItemWithQuantity[item.name] = {
          meal: item,
          quantity: 1
        }
      }
    });
    return objItemWithQuantity;
  }

  useEffect(() => {
    // ! WE STORE THE OBJECT IN AN ARRAY
    const itemWithQuantityObject = new Array(getItemQuantity(ctx.items));
    // ! WE MAKE THIS ARRAY ITERABLE AND CHANGE STATE
    setItemWithQuantityIterable(Object.values(...itemWithQuantityObject));
  }, [ctx.items])


  const closeModalHandler = () => {
    styles += " d-none";
    props.onCloseModal();
  }

  const placeOrderHandler = () => {
    console.log("Ordering...")
    props.onCloseModal();
    ctx.items = [];
  }

  const changeListHandler = (item, action) => {
    const itemIndex = itemWithQuantityIterable.findIndex(el => el === item)

    if (action === "add") {
      if (itemWithQuantityIterable[itemIndex].quantity === 5) return
      itemWithQuantityIterable[itemIndex].quantity++
      ctx.setTotalAmount(ctx.totalAmount += itemWithQuantityIterable[itemIndex].meal.price)
    } else if (action === "remove") {
      if (itemWithQuantityIterable[itemIndex].quantity === 1) {
        itemWithQuantityIterable[itemIndex].quantity--
        itemWithQuantityIterable.filter(el => el !== item)
        ctx.setTotalAmount(ctx.totalAmount -= itemWithQuantityIterable[itemIndex].meal.price)

      } else {
        itemWithQuantityIterable[itemIndex].quantity--
        ctx.setTotalAmount(ctx.totalAmount -= itemWithQuantityIterable[itemIndex].meal.price)
      }
    }

    console.log(itemWithQuantityIterable);
    const updatedItemsArray = []

    itemWithQuantityIterable.forEach(obj => {
      let x = 0;
      while (x < obj.quantity) {
        updatedItemsArray.push(obj.meal)
        x++
      }
    })

    ctx.setItems(updatedItemsArray)
  }

  return (
    <div className={classes.modal}>
      <div className={classes["cart-items"]}>
        {ctx.items.length === 0 && <p className={classes["cart-empty-message"]}>There is no item in the cart...</p>}
        {ctx.items.length !== 0 &&
          itemWithQuantityIterable.map((item, i) => {
            return (<CartItem item={item} onChangeList={changeListHandler} itemName={item.meal.name} itemPrice={item.meal.price} itemQuantity={item.quantity} key={i}></CartItem>)
          })}
        {ctx.items.length !== 0 &&
          <div className={classes.total}>
            <h2>Total Amount</h2>
            <div>
              <p className={classes["total-price"]}>$ {ctx.totalAmount.toFixed(2)}</p>
              <div className={classes.actions}>
                <Button className={classes["button--alt"]} onClick={closeModalHandler}>Close</Button>
                <Button className={classes.button} onClick={placeOrderHandler}>Order</Button>
              </div>
            </div>
          </div>}
      </div>
    </ div >)
}



const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClick={props.closeModalHandler} onCloseModal={props.onCloseModal} />, document.getElementById("backdrop-container"))}
      {ReactDom.createPortal(<ModalContent onCloseModal={props.onCloseModal} />, document.getElementById("modal-content"))}
      {/* {ReactDom.createPortal(<Backdrop onClick={props.closeModalHandler} onCloseModal={props.onCloseModal} />, document.getElementById("backdrop-container"))}
      {ReactDom.createPortal(<ModalContent onClick={props.closeModalHandler} onCloseModal={props.onCloseModal} />, document.getElementById("modal-content"))} */}
    </>
  );
}

export default Modal;
