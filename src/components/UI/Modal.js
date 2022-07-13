import ReactDom from "react-dom";
import ModalContent from "./ModalContent"
import classes from "./Modal.module.css";
let styles = `${classes.modal}`


const Backdrop = (props) => {
  const closeModalHandler = () => {
    styles += " d-none";
    props.onCloseModal();
  }
  return (<div className={classes.backdrop} onClick={closeModalHandler}></div>)
}

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClick={props.closeModalHandler} onCloseModal={props.onCloseModal} />, document.getElementById("backdrop-container"))}
      {ReactDom.createPortal(<ModalContent onCloseModal={props.onCloseModal} />, document.getElementById("modal-content"))}
    </>
  );
}

export default Modal;
