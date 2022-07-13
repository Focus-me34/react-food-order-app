import { useState } from "react";
import { useEffect } from "react";
import useInputBis from "../../hooks/useInput";
import classes from "./CheckoutForm.module.css"

const CheckoutForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInputBis(value => value.trim() !== "")

  const {
    value: enteredAddress,
    isValid: addressIsValid,
    hasError: addressHasError,
    onChangeHandler: addressChangeHandler,
    onBlurHandler: addressBlurHandler,
    reset: resetAddress
  } = useInputBis(value => value.trim() !== "" && value.match(/\d+/))


  // ! WE ENABLE THE SUBMIT BUTTON IN PARENT CONTROLLER IF FORM IS VALID
  useEffect(() => {
    if (nameIsValid && addressIsValid) {
      setFormIsValid(true)
      props.desactivateButton(true);
    } else {
      props.desactivateButton(false);
    }
  }, [enteredName, enteredAddress])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(enteredName);
    if (!formIsValid) return
    // ! We use the method in the parent component to manage the data with fetch
    props.onSubmitForm({name: enteredName, address: enteredAddress});
    resetName();
    resetAddress();
  }

  const nameClasses = nameHasError ? `${classes["form-control"]} ${classes.invalid}` : `${classes["form-control"]}`
  const addressClasses = addressHasError ? `${classes["form-control"]} ${classes.invalid}` : `${classes["form-control"]}`

  return (

    <form className={classes.form} id="meal-order-user-details" onSubmit={onSubmitHandler}>
      <hr />

      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enteredName} />
        {nameHasError ? <p className={classes["error-text"]}>Enter a valid name</p> : <p className={classes.invisible}>.</p>}
      </div>

      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" onChange={addressChangeHandler} onBlur={addressBlurHandler} value={enteredAddress} />
        {addressHasError ? <p className={classes["error-text"]}>Enter a valid name</p> : <p className={classes.invisible}>.</p>}
      </div>
      <hr />

    </form>
  );
}

export default CheckoutForm;
