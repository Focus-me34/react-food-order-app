import { useReducer } from "react"

const initialState = {
  value: "",
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value }
  }
  if (action.type === "BLUR") {
    return { ...state, isTouched: true }
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false }
  }
}

const useInputBis = (checkValidity) => {
  const [inputState, inputStateDispatch] = useReducer(inputStateReducer, initialState)

  const isInputValid = checkValidity(inputState.value)
  const hasError = !isInputValid && inputState.isTouched

  const onChangeHandler = (e) => {
    inputStateDispatch({ type: "CHANGE", value: e.target.value })
  }

  const onBlurHandler = (e) => {
    inputStateDispatch({ type: "BLUR" })
  }

  const reset = () => {
    inputStateDispatch({ type: "RESET" })
  }

  return {
    value: inputState.value,
    isValid: isInputValid,
    hasError,
    onChangeHandler,
    onBlurHandler,
    reset
  }
}

export default useInputBis;
