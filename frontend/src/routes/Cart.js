import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../App.css";
import FoodCard from "../componentsReusable/FoodCard";
import FunctionsHandler from "../components/FunctionsHandler";
import MenuNav from "../components/MenuNav";
import OrderForm from "../components/OrderForm";
import sadTacoImg from "../images/taco-sad.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ItemsComponent(props) {
  const { cart } = props;
  const { openConfirmationFunction } = FunctionsHandler();

  function handleRemoveAll() {
    let isRemoveAll = true;
    openConfirmationFunction({}, isRemoveAll);
  }

  return (
    <div className="cart-items">
      <div className="cart-details-control">
        {cart.items && cart.items.length !== 0 ? (
          <button onClick={handleRemoveAll}>Remove All</button>
        ) : null}
      </div>

      {cart.items.map((item, index) => (
        <FoodCard
          item={item}
          index={index}
          isInteractive={true}
          key={item.cartId}
        />
      ))}
    </div>
  );
}

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const menu = useSelector((state) => state.menu);
  const { loadCartFromLocalStorage } = FunctionsHandler();

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  function EmptyCartPlaceholder() {
    return (
      <div className="cart-placeholder">
        <h2>It's empty :(</h2>
        <img src={sadTacoImg} alt="sad taco" />
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="cart">
      <div className="content-container">
        <MenuNav menu={menu} />
        <h2 className="cart-title cart-section cart-section-end">Cart</h2>
        {cart.items.length > 0 ? (
          <div className="cart-details-container">
            <ItemsComponent cart={cart} />
            <OrderForm
              items={cart.items}
              totalAmount={cart.totalAmount}
              totalPrice={cart.totalPrice}
            />
          </div>
        ) : (
          <EmptyCartPlaceholder />
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
