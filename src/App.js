import './App.css';
import { useContext, useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import MenuItem from './components/menu/MenuItem';
import Home from './components/home/Home';
import CartContext from './context/cart-context';

function App() {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [animate, setAnimate] = useState(false)

  const createNewItems = (i, q) => {
    // ! THIS IS A HELPER FUNCTION TO CORRECTLH UPDATE THE NUMBER OF ITEM IN CART
    const newItemsArray = [];
    let x = 0
    while (x < q) {
      newItemsArray.push(i);
      x++
    }
    return newItemsArray;
  }

  const addItemToCart = (item, quantity) => {
    const newItems = createNewItems(item, quantity)
    setItems([...items, ...newItems]);
    setTotalAmount(prevState => prevState += (item.price * quantity))
  }

  const removeItemFromCart = (item) => {
    const updatedItems = items.filter(el => el.id == !item.id)
    setItems(updatedItems)
  }

  return (
    <CartContext.Provider value={{
      items: items,
      setItems: setItems,
      totalAmount: totalAmount,
      setTotalAmount: setTotalAmount,
      addItem: addItemToCart,
      removeItem: removeItemFromCart,
      setAnimate: setAnimate,
      animate: animate
    }}>
      <Navbar></Navbar>

      <Home>
        <MenuItem></MenuItem>
      </Home>

    </CartContext.Provider>);
}

export default App;
