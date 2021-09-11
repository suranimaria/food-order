import classes from "./AvailableOrders.module.css";
import Card from "../../UI/Card";
import OrderItem from "../OrderItem/OrderItem";

const AvailableOrders = (props) => {
  let ordersList;

  if (props.orders) {
    ordersList = props.orders.map((order, idx) => (
      <OrderItem
        key={idx}
        orderIdKey={order.id}
        name={order.name}
        street={order.street}
        city={order.city}
        priceArray={order.priceArray}
        onShowOrderCart={props.onShowOrderCart}
        onOrderIdShown={props.onOrderIdShown}
        onShowDeleteModal={props.onShowDeleteModal}
        onDeleteOrderIdShown={props.onDeleteOrderIdShown}
      />
    ));
  }

  return (
    <section className={classes.orders}>
      <Card>
        <ul>{ordersList}</ul>
      </Card>
    </section>
  );
};

export default AvailableOrders;
