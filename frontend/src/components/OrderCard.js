import { useState } from "react";
import { useSelector } from "react-redux";
import Divider from "../componentsReusable/Divider";
//import { getOrders } from "../redux/ducks/ordersSlice";
import LoadingPlaceholder from "../componentsReusable/LoadingPlaceholder";
import DeliveryInfo from "../componentsReusable/DeliveryInfo";
import FoodCard from "../componentsReusable/FoodCard";
import { ERROR_PERMISSION } from "../services/services";


export default function OrderCard(props) {
  const { order } = props;
  const user = useSelector((state) => state.authentication.user);
  //const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    if (!user) {
      return;
    }

    if (!window.confirm(`Delete order?`)) {
      return;
    }

    setError(ERROR_PERMISSION);

    // setLoading(true);

    // await fetch("/api/orders/" + order._id, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: user ? `Bearer ${user.token}` : ``,
    //   },
    // })
    //   .then(() => setLoading(false))
    //   .then(() => dispatch(getOrders()));
  }

  function handleCloseError() {
    setError(null);
  }

  function TitleWithControls() {
    return (
      <>
        <div className="order-card-header">
          <h2>ID: ****{order._id.slice(-5)}</h2>

          <div className="order-card-header-controls">
            <button
              className="order-card-header-delete"
              onClick={handleDelete}
            />
          </div>
        </div>
        <Divider styles="divider-big divider-left" />
        {error && <div className="order-card-error" onClick={handleCloseError}>{error}</div>}
      </>
    );
  }

  function Details() {
    return (
      <div className="order-card-details">
        <h3>Details</h3>
        {order.items.map((item, index) => (
          <FoodCard
            item={item}
            index={index}
            isInteractive={false}
            key={item.cartId}
          />
        ))}
        <p>
          <span className="bold">Total Price: </span>
          {/* {order.totalPrice.$numberDecimal.toString()} ${" "} */}
          {order.totalPrice} $
        </p>
        <Divider styles="divider-small divider-left" />
      </div>
    );
  }

  function Payment() {
    return (
      <>
        <p>
          <span className="bold">Payment: </span>
          {order.paymentMethod}
        </p>
        <p></p>
        <Divider styles="divider-small divider-left" />
      </>
    );
  }

  function Status() {
    return (
      <>
        <h3>Status</h3>
        <p className="order-card-status">In process...</p>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <div className="order-card">
          <TitleWithControls />
          <DeliveryInfo order={order} />
          <Details />
          <Payment />
          <Status />
        </div>
      )}
    </>
  );
}
