import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";
import LoadingPlaceholder from "../componentsReusable/LoadingPlaceholder";
import { getOrders } from "../redux/ducks/ordersSlice";
import sadTacoImg from "../images/taco-sad.png";
import Header from "../components/Header";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const isLogged = useSelector((state) => state.authentication.isLogged);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getOrders());
    loadOrders();

    async function loadOrders() {
      if (orders) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
  }, [dispatch]);

  function ListOfOrders() {
    return (
      <div className="orders-list">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    );
  }

  function OrdersContent() {
    return (
      <>
        {!loading ? (
          <div className="orders-title">
            <h1>Orders</h1>
            <h1>(Not saved with test account)</h1>
            <ListOfOrders />
          </div>
        ) : (
          <LoadingPlaceholder />
        )}
      </>
    );
  }

  function OrdersPlaceholder() {
    return (
      <div className="orders-title orders-placeholder">
        <h1> Please Log in to view orders</h1>
        <img src={sadTacoImg} alt="sad taco" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="orders content-container">
        {isLogged ? <OrdersContent /> : <OrdersPlaceholder />}
      </div>
    </>
  );
}
