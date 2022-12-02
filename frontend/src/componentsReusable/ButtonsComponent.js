import "../App.css";

export function ButtonMinus(props) {
  const { onClick, disabled, size } = props;
  return (
    <div
      id="modal-decrement"
      className={`minus btn-div ${size}`}
      onClick={onClick}
      disabled={disabled}
    ></div>
  );
}

export function ButtonPlus(props) {
  const { onClick, disabled, size } = props;
  return (
    <div
      id="modal-increment"
      className={`plus btn-div ${size}`}
      onClick={onClick}
      disabled={disabled}
    ></div>
  );
}

export function ButtonClose(props) {
  const { onClick } = props;
  return <div id="close" className={`close btn-div`} onClick={onClick}></div>;
}

export function ButtonRemove(props) {
  const { onClick, size } = props;
  return <div id="remove" className={`remove`} onClick={onClick}></div>;
}
