import React from "react";

const CartContext = React.createContext(
  {
    items: [],
    setItems: null,
    totalAmount: 0,
    setTotalAmount: null,
    addItem: null,
    removeItem: null,
    bump: null,
    animate: false
  }
)

export default CartContext;
