import AvailableOrders from "./AvailableOrders";
import OrderSummary from "./OrderSummary";

const OrderHistory = (props) => {
  return (
    <>
      <OrderSummary />
      <AvailableOrders
        onShowOrderCart={props.onShowOrderCart}
        onShowDeleteModal={props.onShowDeleteModal}
        onOrderIdShown={props.onOrderIdShown}
        onDeleteOrderIdShown={props.onDeleteOrderIdShown}
        orders={props.orders}
      />
    </>
  );
};

export default OrderHistory;
