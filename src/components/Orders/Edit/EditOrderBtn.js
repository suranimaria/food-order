const EditOrderBtn = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();

    props.onShowOrderCart();
    props.onOrderIdShown(props.orderIdKey);
  };

  return (
    <button onClick={submitHandler}>
      <span>Edit</span>
    </button>
  );
};

export default EditOrderBtn;
