import ReactDOM from "react-dom";

import classes from "./OrderModal.module.css";
import OrderDetails from "./OrderDetails";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <OrderDetails
          orderId={props.orderId}
          onClose={props.onClose}
          updateOrdersHandler={props.updateOrdersHandler}
        />
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const OrderModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          orderId={props.orderId}
          onClose={props.onClose}
          updateOrdersHandler={props.updateOrdersHandler}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default OrderModal;
