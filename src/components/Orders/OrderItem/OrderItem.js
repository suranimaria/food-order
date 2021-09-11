import OrderItemForm from "./OrderItemForm";
import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  const priceSum = props.priceArray.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });
  const price = `£${priceSum.toFixed(2)}`;

  return (
    <div className={classes.orderContainer}>
      <div className={classes.userData}>
        <h3>{props.name}</h3>

        <div className={classes.description}>
          {props.street}, {props.city}
        </div>
      </div>

      <div className={classes.totalAmount}>{price}</div>
      <OrderItemForm
        onShowOrderCart={props.onShowOrderCart}
        orderIdKey={props.orderIdKey}
        onOrderIdShown={props.onOrderIdShown}
        onShowDeleteModal={props.onShowDeleteModal}
        onDeleteOrderIdShown={props.onDeleteOrderIdShown}
      />
    </div>
  );
};

export default OrderItem;
