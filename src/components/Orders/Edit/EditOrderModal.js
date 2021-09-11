import React from "react";

import OrderModal from "../Modal/OrderModal";

const EditOrderModal = (props) => {
  return (
    <OrderModal
      onClose={props.onClose}
      orderId={props.orderId}
      updateOrdersHandler={props.updateOrdersHandler}
    />
  );
};

export default EditOrderModal;
