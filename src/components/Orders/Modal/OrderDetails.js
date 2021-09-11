import { useEffect, useState } from "react";

import Card from "../../UI/Card";
import classes from "./OrderDetails.module.css";
import EditModalItem from "./EditModalItem";

const OrderDetails = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        `https://react-meals-6c585-default-rtdb.europe-west1.firebasedatabase.app/orders/${props.orderId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      setUser(responseData.user);

      const loadedMeals = [];

      for (const key in responseData.orderedItems) {
        loadedMeals.push({
          id: key,
          name: responseData.orderedItems[key].name,
          price: responseData.orderedItems[key].price,
          amount: responseData.orderedItems[key].amount,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const updateMealsHandler = (id, newMeal) => {
    let tempValue = meals;
    tempValue[id] = newMeal;
    setMeals(tempValue);
  };

  const applyOrderHandler = async () => {
    await fetch(
      `https://react-meals-6c585-default-rtdb.europe-west1.firebasedatabase.app/orders/${props.orderId}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderedItems: meals,
          user: user,
        }),
      }
    );
    props.updateOrdersHandler(
      {
        id: props.orderId,
        name: user.name,
        street: user.street,
        city: user.city,
        postalCode: user.postalCode,
        orderedItems: meals,
        priceArray: meals.map((item) => item.price * item.amount),
      },
      props.orderId
    );
    props.onClose();
  };

  const mealsList = meals.map((meal) => (
    <EditModalItem
      key={meal.id}
      meal={meal}
      updateMealsHandler={updateMealsHandler}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && <ul>{mealsList}</ul>}
        <div className={classes.btnContainer}>
          <button className={classes.btn} onClick={applyOrderHandler}>
            <span>Apply</span>
          </button>
        </div>
      </Card>
    </section>
  );
};

export default OrderDetails;
