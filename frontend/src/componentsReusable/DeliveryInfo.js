import Divider from "./Divider";

export default function DeliveryInfo(props) {
  const { order } = props;

  return (
    <div className="delivery-info">
      <p>
        <span className="bold">Phone Number: </span>
        {order.phoneNumber}
      </p>
      <p>
        <span className="bold">Address: </span>
        {order.address}
      </p>
      {order.note ? (
        <>
          <p>
            <span className="bold">Note: </span>
            {order.note}
          </p>
          <Divider styles="divider-small divider-left" />
        </>
      ) : (
        <Divider styles="divider-small divider-left" />
      )}
    </div>
  );
}
