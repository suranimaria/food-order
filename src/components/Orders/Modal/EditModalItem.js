import EditModalItemForm from "./EditModalItemForm";
import classes from "./EditModalItem.module.css";

const EditModalItem = (props) => {
  const price = `£${props.meal.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <EditModalItemForm
          meal={props.meal}
          updateMealsHandler={props.updateMealsHandler}
        />
      </div>
    </li>
  );
};

export default EditModalItem;
