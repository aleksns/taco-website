import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function LocalStorageWatcher() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart.items && cart.items.length !== 0) {
      localStorage.setItem("cartItems", JSON.stringify(cart.items));
      localStorage.setItem("cartTotalAmount", JSON.stringify(cart.totalAmount));
      localStorage.setItem("cartTotalPrice", JSON.stringify(cart.totalPrice));
    }
  }, [cart]);
}
