import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartTotal,
  setCartItems,
  incrementCartItem,
  decrementCartItem,
  calcCartItemPrice,
  updateCartItem,
  emptyCart,
  setCartTotal,
} from "../redux/ducks/cartSlice";
import {
  closeModal,
  openModal,
  setEditModal,
  setModalItem,
} from "../redux/ducks/modalSlice";
import {
  openConfirmation,
  closeConfirmation,
  setConfirmationItem,
  removeConfirmationItem,
} from "../redux/ducks/confirmationSlice";
import {
  calculateTotalPrice,
  getRandomId,
  isArraysOfObjectsEqual,
} from "../services/services";
import {
  closeSearch,
  openSearch,
  setSearchItems,
} from "../redux/ducks/searchSlice";
import {
  closeNotification,
  openNotification,
  setNotificationImage,
  addNotificationText,
  setNotificationType,
} from "../redux/ducks/notificationSlice";
import {
  removeCreatedOrder,
  setCreatedOrder,
} from "../redux/ducks/createdOrderSlice";
import { login, logout } from "../redux/ducks/authenticationSlice";

export default function FunctionsHandler() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const cart = useSelector((state) => state.cart);
  const additions = useSelector((state) => state.additions);

  function openSearchResultWindow() {
    dispatch(openSearch());
  }
  function closeSearchResultWindow() {
    dispatch(closeSearch());
  }
  function setSearchItemsFunction(items) {
    dispatch(setSearchItems(items));
  }
  function openConfirmationFunction(item, isRemoveAll) {
    dispatch(setConfirmationItem(item));
    dispatch(openConfirmation(isRemoveAll));
  }

  function closeConfirmationFunction() {
    dispatch(closeConfirmation());
  }

  function openModalFood(item) {
    dispatch(setModalItem(item));
    dispatch(openModal());
  }

  function closeFoodCard() {
    dispatch(closeModal());
    dispatch(setEditModal(false));
  }

  function openEditFoodCard(item) {
    dispatch(setModalItem(item));
    dispatch(openModal());
    dispatch(setEditModal(true));
  }

  function incrementAmount(index) {
    dispatch(incrementCartItem(index));
    dispatch(calcCartItemPrice(index));

    const priceDifference =
      cart.items[index].totalPrice / cart.items[index].amountOrdered;
    dispatch(updateCartTotal({ amountDifference: 1, priceDifference }));
  }
  function decrementAmount(index) {
    dispatch(decrementCartItem(index));
    dispatch(calcCartItemPrice(index));

    const priceDifference =
      -cart.items[index].totalPrice / cart.items[index].amountOrdered;
    dispatch(updateCartTotal({ amountDifference: -1, priceDifference }));
  }

  function updateItemAmountAndCalcPrice(index, newOrderItem) {
    const newAmount =
      cart.items[index].amountOrdered + newOrderItem.amountOrdered;

    const newTotalPrice = calculateTotalPrice(
      cart.items[index].price,
      newAmount,
      newOrderItem.additions
    );

    dispatch(
      updateCartItem({
        index,
        amount: newAmount,
        additionsToAdd: newOrderItem.additions,
        totalPrice: newTotalPrice,
      })
    );

    const amountDifference = getTotalAmountDifference(index, newAmount);
    const priceDifference = getTotalPriceDifference(index, newTotalPrice);
    dispatch(updateCartTotal({ amountDifference, priceDifference }));
  }

  function editExistingItem(amount, additionsToAdd, totalPrice) {
    const index = cart.items.indexOf(modal.item);
    dispatch(updateCartItem({ index, amount, additionsToAdd, totalPrice }));

    const amountDifference = getTotalAmountDifference(index, amount);
    const priceDifference = getTotalPriceDifference(index, totalPrice);
    dispatch(updateCartTotal({ amountDifference, priceDifference }));
  }

  function addToCartFunction(amount, additionsToAdd, totalPrice) {
    if (modal.isEdit) {
      editExistingItem(amount, additionsToAdd, totalPrice);
    } else {
      const newOrderItem = { ...modal.item };
      setNewOrderItem(newOrderItem, amount, additionsToAdd, totalPrice);

      if (!handleIsPositionExists(cart.items, newOrderItem)) {
        addAdditionsFunction(newOrderItem, additionsToAdd);
        dispatch(addToCart(newOrderItem));
        dispatch(
          updateCartTotal({
            amountDifference: newOrderItem.amountOrdered,
            priceDifference: newOrderItem.totalPrice,
          })
        );
      }
    }
  }

  function handleIsPositionExists(cartItems, newOrderItem) {
    if (!cartItems) {
      return false;
    }
    var isExists = false;

    cartItems.forEach((cartItem, index) => {
      if (
        isArraysOfObjectsEqual(
          cartItem.additions,
          newOrderItem.additions,
          additions
        ) &&
        cartItem.id === newOrderItem.id
      ) {
        isExists = true;
        updateItemAmountAndCalcPrice(index, newOrderItem);
      }
    });
    return isExists;
  }

  function setNewOrderItem(newOrderItem, amount, additionsToAdd, totalPrice) {
    newOrderItem.amountOrdered = amount;
    newOrderItem.cartId = getRandomId();
    newOrderItem.additions = additionsToAdd;
    newOrderItem.totalPrice = totalPrice;
  }

  function addAdditionsFunction(item, additionsToAdd) {
    item.additions = additionsToAdd;
  }

  function getTotalAmountDifference(index, amount) {
    return amount - cart.items[index].amountOrdered;
  }
  function getTotalPriceDifference(index, totalPrice) {
    return totalPrice - cart.items[index].totalPrice;
  }

  function loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const cartTotalAmount = JSON.parse(localStorage.getItem("cartTotalAmount"));
    const cartTotalPrice = JSON.parse(localStorage.getItem("cartTotalPrice"));
    if (cartItems) {
      dispatch(setCartItems(cartItems));
      dispatch(setCartTotal({ cartTotalAmount, cartTotalPrice }));
    }
  }

  function removeFromCartFunction(item) {
    if (cart.items.length === 1) {
      dispatch(removeConfirmationItem());
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotalAmount");
      localStorage.removeItem("cartTotalPrice");
    }
    dispatch(removeFromCart(item));
    const amountDifference = -item.amountOrdered;
    const priceDifference = -item.totalPrice;
    dispatch(
      updateCartTotal({
        amountDifference,
        priceDifference,
      })
    );
  }

  function emptyCartFunction() {
    dispatch(emptyCart());

    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotalAmount");
    localStorage.removeItem("cartTotalPrice");

    dispatch(removeConfirmationItem());
    dispatch(setCartTotal({ cartTotalAmount: 0, cartTotalPrice: 0 }));
  }

  function setNotificationTypeFunction(type) {
    dispatch(setNotificationType(type));
  }
  function setNotificationTextFunction(text) {
    dispatch(addNotificationText(text));
  }
  function setNotificationImageFunction(image) {
    dispatch(setNotificationImage(image));
  }
  function openNotificationFunction() {
    dispatch(openNotification());
  }
  function closeNotificationFunction() {
    dispatch(closeNotification());
  }

  function setCreatedOrderFunction(order) {
    dispatch(setCreatedOrder(order));
    localStorage.setItem("createdOrder", JSON.stringify(order));
  }
  function removeCreatedOrderFunction() {
    dispatch(removeCreatedOrder());
    localStorage.removeItem("createdOrder");
  }

  function loginFunction(user) {
    dispatch(login(user));
  }
  function logoutFunction() {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("createdOrder");
  }

  return {
    openConfirmationFunction,
    closeConfirmationFunction,
    openModalFood,
    closeFoodCard,
    incrementAmount,
    decrementAmount,
    addToCartFunction,
    removeFromCartFunction,
    openEditFoodCard,
    loadCartFromLocalStorage,
    emptyCartFunction,
    openSearchResultWindow,
    closeSearchResultWindow,
    setSearchItemsFunction,
    setNotificationTypeFunction,
    setNotificationTextFunction,
    setNotificationImageFunction,
    openNotificationFunction,
    closeNotificationFunction,
    setCreatedOrderFunction,
    removeCreatedOrderFunction,
    loginFunction,
    logoutFunction,
  };
}
