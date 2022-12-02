import { useState } from "react";
import InputMask from "react-input-mask";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FunctionsHandler from "../components/FunctionsHandler";
import { ROUTES } from "../services/services";
import NotificationHandler from "./NotificationHandler";

const ERRORS_VALIDATION = {
  PHONE_NUMBER: "Incorrect phone number",
  ADDRESS: "The address is too short",
};
const FORM_DEFAULT = {
  phoneNumber: "",
  address: "",
  paymentMethod: "Card",
  note: "",
};

export default function OrderForm(props) {
  const auth = useSelector((state) => state.authentication);
  const { items, totalAmount, totalPrice } = props;
  const [form, setForm] = useState(FORM_DEFAULT);
  const navigate = useNavigate();

  const { emptyCartFunction, setCreatedOrderFunction } = FunctionsHandler();

  const {
    setNotificationError,
    setNotificationSuccess,
    setNotificationWarning,
  } = NotificationHandler();

  var errors = {
    phoneNumber: "",
    address: "",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.isLogged) {
      setNotificationWarning();
      return;
    }

    if (isFormFieldsValid(form)) {
      const order = {
        totalAmount,
        totalPrice,
        items,
        ...form,
      };

      // const response = await fetch("/api/orders", {
      //   method: "POST",
      //   body: JSON.stringify(order),
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": auth.user? `Bearer ${auth.user.token}` : ``
      //   },
      // });

      // const json = await response.json();

      // if (response.ok) {
      //   setNotificationSuccess();
      //   setForm(FORM_DEFAULT);
      //   emptyCartFunction();
      // } else {
      //   console.log(`ERROR ${json.error}`);
      // }

      setNotificationSuccess();//
      setForm(FORM_DEFAULT);//
      emptyCartFunction();//
      setCreatedOrderFunction(order);
      navigate(ROUTES.CREATED_ORDER);
    } else {
      setNotificationError(errors);
    }
  }

  function handleChange(e) {
    switch (e.target.name) {
      case "phoneNumber":
        setForm({ ...form, phoneNumber: e.target.value });
        isPhoneNumberValid(form.phoneNumber);
        break;
      case "address":
        setForm({ ...form, address: e.target.value });
        isAddressValid(form.address);
        break;
      case "paymentMethod":
        setForm({ ...form, paymentMethod: e.target.value });
        break;
      case "note":
        setForm({ ...form, note: e.target.value });
        break;
      default:
        console.log(`Error handling "handleChange" event in OrderForm`);
        break;
    }
  }

  function isFormFieldsValid(form) {
    isPhoneNumberValid(form.phoneNumber);
    isAddressValid(form.address);

    var isValid = true;
    for (let property in errors) {
      if (errors[property].length != 0) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  function isPhoneNumberValid(phoneNumber) {
    if (phoneNumber.length < 1) {
      errors.phoneNumber = ERRORS_VALIDATION.PHONE_NUMBER;
      return;
    }

    var isValid = true;

    for (let i = 0; i <= phoneNumber.length - 1; i++) {
      if (phoneNumber[i] == "_") {
        isValid = false;
        errors.phoneNumber = ERRORS_VALIDATION.PHONE_NUMBER;
        break;
      }
    }
    if (isValid) {
      errors.phoneNumber = "";
    }
  }

  function isAddressValid(address) {
    if (address.length >= 5) {
      errors.address = "";
    } else {
      errors.address = ERRORS_VALIDATION.ADDRESS;
    }
  }

  return (
    <form
      className="cart-section-form cart-section-border"
      onSubmit={handleSubmit}
    >
      <h2 className="cart-section cart-section-end-small">Details</h2>

      <label htmlFor="phoneNumber">
        <span className="red">* </span>Phone Number:
      </label>
      <InputMask
        id="phoneNumber"
        name="phoneNumber"
        mask="+9(999)-999-99-99"
        maskChar="_"
        value={form.phoneNumber}
        onChange={(e) => handleChange(e)}
        className="cart-section-end-small cart-section-form-input"
      />

      <label htmlFor="address">
        <span className="red">* </span>Address:
      </label>
      <input
        type="text"
        id="address"
        name="address"
        minLength="5"
        maxLength="50"
        autoComplete="off"
        value={form.address}
        required
        className="cart-section-end-small address cart-section-form-input"
        onChange={(e) => handleChange(e)}
      />

      <label>
        <span className="red">* </span>Payment Method:
      </label>
      <div className="order-form-payment cart-section-end-small">
        <input
          type="radio"
          id="payment-card"
          name="paymentMethod"
          value="Card"
          defaultChecked
          onClick={(e) => handleChange(e)}
        />
        <label htmlFor="payment-card">Card</label>

        <input
          type="radio"
          id="payment-cash"
          name="paymentMethod"
          value="Cash"
          onClick={(e) => handleChange(e)}
        />
        <label htmlFor="payment-cash centered-label">Cash</label>
      </div>

      <label htmlFor="note">Note:</label>
      <textarea
        rows="5"
        id="note"
        name="note"
        maxLength="200"
        value={form.note}
        className="cart-section-end-small note cart-section-form-input"
        onChange={(e) => handleChange(e)}
      />

      <p>
        Items: <b>{totalAmount}</b>
      </p>

      <p>
        Total: <b>{totalPrice}$</b>
      </p>

      <button className="btn-submit">
        Place Order
      </button>
    </form>
  );
}
