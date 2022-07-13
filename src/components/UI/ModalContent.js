import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import classes from "./Modal.module.css";


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


  const updateItemArray = () => {
    // ! UPDATE THE ARRAY CONTAINING THE WHOLE LIST OF ITEMS
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

  // ! WE CHANGE THE ARRAY CONTAINING ITEMS WITH QUANTITY
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
    updateItemArray();
  }

  const items = itemWithQuantityIterable.map((item, i) => {
    return (<CartItem item={item} onChangeList={changeListHandler} itemName={item.meal.name} itemPrice={item.meal.price} itemQuantity={item.quantity} key={i}></CartItem>)
  })

  return (
    <div className={classes.modal}>
      <div className={classes["cart-items"]}>
        {ctx.items.length === 0 && <p className={classes["cart-empty-message"]}>There is no item in the cart...</p>}
        {ctx.items.length !== 0 && items}
      </div>
      <CartTotal onCloseModal={props.onCloseModal} items={itemWithQuantityIterable}></CartTotal>
    </ div >)
}

export default ModalContent
