import { useRef, useState, useEffect } from "react";

import Input from "../../UI/Input";
import classes from "./EditModalItemForm.module.css";

const EditModalItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [currentMeal, setCurrentMeal] = useState(null);
  const amountInputRef = useRef();

  useEffect(() => {
    setCurrentMeal(props.meal);
  }, []);

  const changeHandler = async (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);
    if (currentMeal) {
      const newMeal = {
        id: currentMeal.id,
        price: currentMeal.price,
        name: currentMeal.name,
        amount: enteredAmountNumber,
      };
      setCurrentMeal(newMeal);
      props.updateMealsHandler(props.meal.id, newMeal);
    }
  };

  return (
    <form className={classes.form} onChange={changeHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: props.meal.amount,
        }}
      />
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default EditModalItemForm;
