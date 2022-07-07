import CartContext from "./cart-context";
import { useState, useCallback } from 'react';

// *  This component holds all the information regarding the cart context. Makes the App component cleaner
const CartProvider = (props) => {

  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [animate, setAnimate] = useState(false)

  const createNewItems = useCallback((i, q) => {
    console.log("Hey there");
    // * i = item || q = quantity
    // ! THIS IS A HELPER FUNCTION TO CORRECTLY UPDATE THE NUMBER OF ITEM IN CART
    const newItemsArray = [];
    let x = 0
    while (x < q) {
      newItemsArray.push(i);
      x++
    }
    return newItemsArray;
  }, [])

  const addItemToCart = (item, quantity) => {
    const newItems = createNewItems(item, quantity)
    setItems([...items, ...newItems]);
    setTotalAmount(prevState => prevState += (item.price * quantity))
  }

  const removeItemFromCart = (item) => {
    const updatedItems = items.filter(el => el.id == !item.id)
    setItems(updatedItems)
  }

  const cartCtx = {
    items: items,
    setItems: setItems,
    totalAmount: totalAmount,
    setTotalAmount: setTotalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    setAnimate: setAnimate,
    animate: animate
  };

  return (
    <CartContext.Provider value={cartCtx}>{props.children}</CartContext.Provider>
  );
}

export default CartProvider;
