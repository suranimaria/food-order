import { useEffect, useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

import OrderHistory from "./components/Orders/OrderHistory";
import EditOrderModal from "./components/Orders/Edit/EditOrderModal";
import DeleteModal from "./components/DeleteModal";

const MainContainer = (props) => {
  return (
    <div className="main-container">
      <main>
        <Meals />
        <OrderHistory
          onShowOrderCart={props.onShowOrderCart}
          onShowDeleteModal={props.onShowDeleteModal}
          onOrderIdShown={props.onOrderIdShown}
          onDeleteOrderIdShown={props.onDeleteOrderIdShown}
          orders={props.orders}
        />
      </main>
    </div>
  );
};

const ContentContainer = ({ children }) => {
  return <div className="content-container">{children}</div>;
};

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderCartIsShown, setOrderCartIsShown] = useState(false);
  const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
  const [deleteOrderIdShown, setDeleteOrderIdShown] = useState(0);
  const [orderIdShown, setOrderIdShown] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://react-meals-6c585-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push({
          id: key,
          name: responseData[key].user.name,
          street: responseData[key].user.street,
          city: responseData[key].user.city,
          postalCode: responseData[key].user.postalCode,
          orderedItems: responseData[key].orderedItems,
          priceArray: responseData[key].orderedItems.map(
            (item) => item.price * item.amount
          ),
        });
      }
      setOrders(loadedOrders);
    };

    fetchOrders().catch((error) => {});
  }, []);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const orderIdShownHandler = (id) => {
    setOrderIdShown(id);
  };

  const deleteOrderIdShownHandler = (id) => {
    setDeleteOrderIdShown(id);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showOrderCartHandler = () => {
    setOrderCartIsShown(true);
  };

  const showDeleteModalHandler = () => {
    setDeleteModalIsShown(true);
  };

  const hideDeleteModalHandler = () => {
    setDeleteModalIsShown(false);
  };

  const hideOrderCartHandler = () => {
    setOrderCartIsShown(false);
  };

  const updateOrdersHandler = (newOrder, id) => {
    let tempValue = orders;
    let orderIdx;
    orders.forEach((order, idx) => {
      if (order.id === id) {
        orderIdx = idx;
      }
    });

    tempValue[orderIdx] = newOrder;

    const loadedOrders = [];

    for (const key in tempValue) {
      loadedOrders.push({
        id: tempValue[key].id,
        name: tempValue[key].name,
        street: tempValue[key].street,
        city: tempValue[key].city,
        postalCode: tempValue[key].postalCode,
        orderedItems: tempValue[key].orderedItems,
        priceArray: tempValue[key].orderedItems.map(
          (item) => item.price * item.amount
        ),
      });
    }

    setOrders(loadedOrders);
  };

  const deleteOrdersHandler = (id) => {
    let tempValue = orders.filter((order) => order.id !== id);

    setOrders(tempValue);
  };

  const addOrdersHandler = (newOrder) => {
    let tempValue = orders;

    tempValue.push(newOrder);

    setOrders(tempValue);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} addOrdersHandler={addOrdersHandler} />
      )}
      {orderCartIsShown && (
        <EditOrderModal
          onClose={hideOrderCartHandler}
          updateOrdersHandler={updateOrdersHandler}
          orderId={orderIdShown}
        />
      )}
      {deleteModalIsShown && (
        <DeleteModal
          onClose={hideDeleteModalHandler}
          mainHandler={deleteOrdersHandler}
          orderId={deleteOrderIdShown}
        />
      )}
      <ContentContainer>
        <Header onShowCart={showCartHandler} />
        <MainContainer
          onShowOrderCart={showOrderCartHandler}
          onShowDeleteModal={showDeleteModalHandler}
          onOrderIdShown={orderIdShownHandler}
          onDeleteOrderIdShown={deleteOrderIdShownHandler}
          orders={orders}
        />
      </ContentContainer>
    </CartProvider>
  );
}

export default App;
