import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryInfo from "../componentsReusable/DeliveryInfo";
import FoodCard from "../componentsReusable/FoodCard";
import LoadingPlaceholder from "../componentsReusable/LoadingPlaceholder";
import { ROUTES } from "../services/services";

export default function NewCreatedOrder() {
  const [createdOrder, setCreatedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCreatedOrder();

    async function loadCreatedOrder() {
      const order = JSON.parse(localStorage.getItem("createdOrder"));
      setCreatedOrder(order);

      if (order) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        navigate(ROUTES.ERROR);
      }
    }
  }, []);

  function FoodList() {
    return (
      <div className="ordered-food-list">
        {createdOrder.items &&
          createdOrder.items.map((item, index) => (
            <FoodCard
              item={item}
              index={index}
              isInteractive={false}
              key={item.cartId}
            />
          ))}
      </div>
    );
  }

  function PriceAndStatus() {
    return (
      <div className="new-created-order-price">
        <h3 className="new-created-order-section-start new-created-order-section-end">
          Total price: {createdOrder.totalPrice}$
        </h3>
        <p>
          Status: <span className="order-card-status">In process...</span>
        </p>
      </div>
    );
  }

  return (
    <>
      {!loading ? (
        <div className="new-created-order content-container">
          <div className="new-created-order-frame">
            <h1 className="new-created-order-section-end">
              Thank you for your order {":)"}
            </h1>

            <DeliveryInfo order={createdOrder} />

            <h3 className="new-created-order-section-start new-created-order-section-end">
              Order
            </h3>
            <FoodList />

            <PriceAndStatus />
          </div>
        </div>
      ) : (
        <LoadingPlaceholder />
      )}
    </>
  );
}
