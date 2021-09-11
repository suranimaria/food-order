import React from "react";
import Modal from "../UI/Modal";
import classes from "./DeleteOrderModal.module.css";

const DeleteModal = (props) => {
  const deleteHandler = async () => {
    await fetch(
      `https://react-meals-6c585-default-rtdb.europe-west1.firebasedatabase.app/orders/${props.orderId}.json`,
      {
        method: "DELETE",
      }
    );
    props.mainHandler(props.orderId);
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose} orderId={props.orderId}>
      <div className={classes.message}>Are you sure?</div>
      <div className={classes.btnContainer}>
        <button className={classes.btn} onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.btn} onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
