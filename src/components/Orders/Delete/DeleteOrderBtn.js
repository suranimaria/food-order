const DeleteOrderBtn = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();

    props.onShowDeleteModal();
    props.onDeleteOrderIdShown(props.orderIdKey);
  };

  return (
    <button onClick={submitHandler}>
      <span>Delete</span>
    </button>
  );
};

export default DeleteOrderBtn;
