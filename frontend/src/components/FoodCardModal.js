import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ButtonClose,
  ButtonMinus,
  ButtonPlus,
} from "../componentsReusable/ButtonsComponent";
import Divider from "../componentsReusable/Divider";
import { roundDecimalHundreds } from "../services/services";
import FunctionsHandler from "./FunctionsHandler";
import LoadingPlaceholder from "../componentsReusable/LoadingPlaceholder";
import notFoundImg from "../images/planet.png";

export default function FoodCardModal() {
  const modal = useSelector((state) => state.modal);
  const additions = useSelector((state) => state.additions);
  const [amount, setAmount] = useState(
    modal.item.amountOrdered === 0 ? 1 : modal.item.amountOrdered
  );
  const [additionsSelected, setAdditionsSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState(modal.item.price);
  const { closeFoodCard, addToCartFunction } = FunctionsHandler();

  useEffect(() => {
    function calculateTotalPrice() {
      var additionsCost = 0;
      additionsSelected.forEach((addition) => {
        additionsCost += addition.price * addition.amountOrdered;
      });

      setTotalPrice(
        roundDecimalHundreds(amount * modal.item.price + amount * additionsCost)
      );
    }
    additionsSelected && calculateTotalPrice();
  }, [modal, amount, additionsSelected]);

  useEffect(() => {
    if (modal.isEdit) {
      setAmount(modal.item.amountOrdered);
      setAdditionsSelected(modal.item.additions);
    } else {
      setAmount(1);
      setAdditionsSelected(additions);
    }
  }, [additions, modal]);

  function handleCloseFoodCard() {
    closeFoodCard();
  }

  function handleIncrementAmount() {
    if (amount >= 69) {
      return;
    }
    setAmount(amount + 1);
  }

  function handleDecrementAmount() {
    if (amount <= 1) {
      return;
    }
    setAmount(amount - 1);
  }

  function handleAddToCart() {
    addToCartFunction(amount, additionsSelected, totalPrice);
    handleCloseFoodCard();
  }

  function handleIncrementAddition(addition) {
    function increment(value) {
      return value + 1;
    }

    const updatedItems = additionsSelected.map((e) =>
      e.id === addition.id
        ? { ...e, amountOrdered: increment(e.amountOrdered) }
        : e
    );

    updateAdditionsSelected(updatedItems);
  }

  function handleDecrementAddition(addition) {
    function decrement(value) {
      return value - 1;
    }

    const updatedItems = additionsSelected.map((e) =>
      e.id === addition.id
        ? { ...e, amountOrdered: decrement(e.amountOrdered) }
        : e
    );
    updateAdditionsSelected(updatedItems);
  }

  function updateAdditionsSelected(updatedItems) {
    setAdditionsSelected([...updatedItems]);
  }

  function ModalRightPlaceholder() {
    return (
      <div className="modal-right-placeholder">
        <img src={notFoundImg} alt="not-found"></img>

        <div>
          <h4>"{modal.item.name}" currently has no additions to customize</h4>
          <h4>We will add a detailed description here later!</h4>
        </div>
      </div>
    );
  }

  function ModalRightAdditions() {
    return (
      <>
        <div className="food-card-modal-additions-container">
          <h2>Customize</h2>
          <div className="food-card-modal-additions-grid">
            {additionsSelected.map((addition) => (
              <div key={addition.id} className="food-card-modal-additions-item">
                <img
                  src={addition.imageUrl}
                  alt={addition.name}
                  className="food-card-modal-additions-item-img"
                />
                <h3>{addition.name}</h3>
                <p>{addition.price}$</p>
                <div className="food-card-modal-additions-control">
                  <ButtonMinus
                    onClick={() => handleDecrementAddition(addition)}
                    disabled={addition.amountOrdered <= 0}
                    size="btn-small"
                  />
                  <p className="food-card-modal-order-control-amount-small">
                    {addition.amountOrdered}
                  </p>
                  <ButtonPlus
                    onClick={() => handleIncrementAddition(addition)}
                    disabled={addition.amountOrdered >= 5}
                    size="btn-small"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function ModalRightControl() {
    return (
      <div className="food-card-modal-order-control">
        <div className="food-card-modal-order-input">
          <ButtonMinus
            onClick={handleDecrementAmount}
            disabled={amount <= 1}
            size="btn-big"
          />
          <h3 className="food-card-modal-order-control-amount">{amount}</h3>
          <ButtonPlus
            onClick={handleIncrementAmount}
            disabled={amount >= 69}
            size="btn-big"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="food-card-modal-order-control-tocart"
        >
          Add - {totalPrice}$
        </button>
      </div>
    );
  }

  function ModalLeftSide() {
    return (
      <div className="modal-left centered-section">
        <img src={modal.item.imageUrl} alt={`${modal.item.name}`} />

        <div>
          <h1>{modal.item.name}</h1>
          <h2 style={{ fontWeight: 300 }}>{modal.item.description}</h2>
          <Divider styles="divider-big divider-centered" />
          <p>{modal.item.price} $</p>
        </div>
      </div>
    );
  }

  function ModalRightSide() {
    return (
      <div className="modal-right centered-section">
        <ButtonClose onClick={handleCloseFoodCard} size="btn-big" />
        {modal.item.isAdditions ? (
          <ModalRightAdditions />
        ) : (
          <ModalRightPlaceholder />
        )}
        <ModalRightControl />
      </div>
    );
  }

  return (
    <>
      {modal.isOpen && (
        <>
          {modal.item ? (
            <>
              <div className="modal food-card-modal no-user-select">
                <ModalLeftSide />
                <ModalRightSide />
              </div>
              <div className="overlay" onClick={handleCloseFoodCard}></div>
            </>
          ) : (
            <LoadingPlaceholder />
          )}
        </>
      )}
    </>
  );
}
