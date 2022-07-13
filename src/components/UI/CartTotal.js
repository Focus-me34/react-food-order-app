import { useContext } from "react";
import CartContext from "../../context/cart-context";
import Button from "./Button";
import CheckoutForm from "./CheckoutForm";
import classes from "./Modal.module.css";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const CartTotal = (props) => {
  const ctx = useContext(CartContext)
  const [desactivateSubmitButton, setDesactivateSubmitButton] = useState(false)
  const [orders, setOrders] = useState([]) // We could use the order variable to display previous orders
  const { isLoading, error, sendRequest: sendOrderRequest } = useFetch(); // We could use those variables to to display conditonal templates

  let styles = `${classes.modal}`

  // ! CLOSING HANDLER
  const closeModalHandler = () => {
    styles += " d-none";
    props.onCloseModal();
  }

  const createOrder = (orderData) => {
    const generatedId = orderData.name; // firebase-specific => "name" contains generated id
    const createdOrder = { id: generatedId, order: orderData };

    setOrders(prevState => prevState.concat(createdOrder))
  }

  // ! SENDS THE POST REQUEST
  const sendOrder = async (orderData) => {
    sendOrderRequest({
      url: "https://react-food-order-app-c715b-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { order: orderData },
    },
      createOrder.bind(null, orderData))
  }

  // ! CREATE THE COMPLETE ORDER OBJECT AND CALL THE FUNCTION IN CHARGE OF SENDING THE HTTP POST REQUEST
  const placeOrderHandler = async (clientInfos) => {
    console.log("Ordering summary...")
    const orderSummary = { order: props.items, clientName: clientInfos.name, clientAddress: clientInfos.address }
    console.log(orderSummary);
    sendOrder(orderSummary)

    props.onCloseModal();
    ctx.setItems([]);
  }

  const classesButton = desactivateSubmitButton ? `${classes.button}` : `${classes.button} ${classes["btn-disabled"]}`

  return (
    <>
      {ctx.items.length !== 0 && <CheckoutForm desactivateButton={setDesactivateSubmitButton} onSubmitForm={placeOrderHandler} />}
      {ctx.items.length !== 0 &&
        <div className={classes.total}>
          <h2>Total Amount</h2>
          <div>
            <p className={classes["total-price"]}>$ {ctx.totalAmount.toFixed(2)}</p>
            <div className={classes.actions}>
              <Button className={classes["button--alt"]} onClick={closeModalHandler}>Close</Button>
              {/*
              The form attribute on the button below, links it to the form with same
              id inside the CheckoutForm component. Clicking on it triggers the "submit" event.
               */}
              <Button form='meal-order-user-details' className={classesButton} disabled={!desactivateSubmitButton}>Order</Button>
            </div>
          </div>
        </div>}
    </>
  );
}

export default CartTotal;
