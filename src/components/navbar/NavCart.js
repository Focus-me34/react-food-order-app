import { useState, useContext } from "react";
import Button from "../UI/Button";
import CartIcon from "../UI/CartIcon";
import Modal from "../UI/Modal";
import CartContext from "../../context/cart-context";
import classes from "./NavCart.module.css"

const NavCart = () => {
  const ctx = useContext(CartContext);
  const [showModal, setShowModal] = useState(false)

  const btnClasses = `${classes.button} ${ctx.animate === true ? classes.bump : ''}`;

  const toggleCartModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  }

  const onCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Button
        onClick={toggleCartModal}
        className={btnClasses}
      >
        <CartIcon></CartIcon>
        <p>Your cart</p>
        <p className={classes.badge}>{ctx.items.length}</p>
      </Button>
      {showModal === true && <Modal onCloseModal={onCloseModal}></Modal>}
    </>
  );
}

export default NavCart;
