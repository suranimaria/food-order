import classes from "./OrderItemForm.module.css";
import EditOrderBtn from "../Edit/EditOrderBtn";
import DeleteOrderBtn from "../Delete/DeleteOrderBtn";

const OrderItemForm = (props) => {
  return (
    <form className={classes.form}>
      <div className={classes.btnContainer}>
        <DeleteOrderBtn
          onShowDeleteModal={props.onShowDeleteModal}
          onDeleteOrderIdShown={props.onDeleteOrderIdShown}
          orderIdKey={props.orderIdKey}
        />
        <EditOrderBtn
          onShowOrderCart={props.onShowOrderCart}
          orderIdKey={props.orderIdKey}
          onOrderIdShown={props.onOrderIdShown}
        />
      </div>
    </form>
  );
};

export default OrderItemForm;
