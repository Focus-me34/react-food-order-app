import { useEffect, useRef, useState, useContext, useCallback } from "react";
import Button from "./Button";
import CartContext from "../../context/cart-context";
import classes from "./Input.module.css"

const Input = (props) => {
  const [inputValue, setInputValue] = useState(1)
  const ctx = useContext(CartContext);
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      ctx.setAnimate(false)
    }, 300);

    return () =>  {
      clearInterval(timer) // * We clear the interval of the timer if the user clicks multiple times on the butons.
    }
  }, [ctx.animate])

  const onChangeHandler = useCallback(() => {
    setInputValue(inputRef.current.value);
  }, [])

  const onClickHandler = (e, meal) => {
    e.preventDefault();
    ctx.addItem(meal, Number(inputRef.current.value));
    setInputValue(1);
    ctx.setAnimate(true)
  }

  return (
    <div className={classes.input}>
      <div className={classes["add-form-container"]}>
        <form action="" >
          <div className={classes["add-form"]}>
            <label htmlFor={`${props.meal}-quantity`} id={`label[${props.meal}-quantity]`}>Amount</label>
            <input ref={inputRef} onChange={(e) => onChangeHandler(e)} type="number" id={`input[${props.meal}-quantity]`} name="item-quantity" value={inputValue} min="0" max="5" />
          </div>
        <Button onClick={(e) => onClickHandler(e, props.meal)} type="submit">+ ADD</Button>
        </form>
      </div>
    </div>
  );
}

export default Input;
