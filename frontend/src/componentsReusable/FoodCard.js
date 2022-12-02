import { useEffect, useState } from "react";
import "../App.css";
import { ButtonMinus, ButtonPlus, ButtonRemove } from "./ButtonsComponent";
import FunctionsHandler from "../components/FunctionsHandler";

function DividerComponent() {
  return <div className="divider-small cart-food-card-divider"></div>;
}

export default function FoodCard(props) {
  const { item, index, isInteractive } = props;
  const {
    openConfirmationFunction,
    incrementAmount,
    decrementAmount,
    openEditFoodCard,
  } = FunctionsHandler();
  const [additionsToRender, setAdditionsToRender] = useState([]);

  useEffect(() => {
    const temp = item.additions.filter(
      (addition) => addition.amountOrdered != 0
    );
    setAdditionsToRender(temp);
  }, [item]);

  function handleIncrementCartItem() {
    incrementAmount(index);
  }

  function handleDecrementCartItem() {
    if(item.amountOrdered <= 1) {
      openConfirmationFunction(item);
    }
    else {
      decrementAmount(index);
    }
  }

  function handleRemoveItem() {
    openConfirmationFunction(item);
  }

  function ItemControls() {
    return (
      <div className="centered-section cart-food-card-content-control">
      <button onClick={() => openEditFoodCard(item)} className="button-edit">Edit</button>
        <div className="centered-section cart-food-card-content-control-amount-btns"> 
        <ButtonMinus
          onClick={handleDecrementCartItem}
          size="btn-small"
        />
        <p className="food-cart-control-amount">{item.amountOrdered}</p>
        <ButtonPlus
          onClick={handleIncrementCartItem}
          disabled={item.amountOrdered >= 69}
          size="btn-small"
        />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="cart-food-card-container">
        <img
          className="cart-food-card-img"
          src={item.imageUrl}
          alt={item.name}
        />

        <div className="cart-food-card-content">
          <div className="cart-food-card-content-header">
            <h4>{item.name}</h4>
            {isInteractive && <ButtonRemove onClick={handleRemoveItem} size="btn-small"/>}
            
          </div>

          <div className="cart-food-card-content-body">
            <p>{item.totalPrice}$</p>
            {additionsToRender.map((addition) => (
              <p key={addition.id} style={{ color: "green" }}>
                + {addition.name} x{addition.amountOrdered}
              </p>
            ))}
            {isInteractive && <ItemControls />}
          </div>
        </div>
      </div>
      <DividerComponent />
    </>
  );
}
