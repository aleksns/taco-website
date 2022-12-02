import errorImg from "../images/error-img.png";
import successImg from "../images/success-img.png";
import warningImg from "../images/warning-img.png";

export const NAME = "Horny Taco";
export const ERROR_PERMISSION = "You don't have permission to rewrite DB";
export const GIT_LINK = "https://github.com/aleksns";
export const ROUTES = {
  HOME: "/",
  ORDERS: "/orders",
  SIGN_UP: "/signup",
  LOG_IN: "/login",
  CART: "/cart",
  CREATED_ORDER: "/createdorder",
  ERROR: "/404",
};

export const NOTIFICATION = {
  ERROR_TYPE: "notification-error",
  SUCCESS_TYPE: "notification-success",
  WARNING_TYPE: "notification-warning",
  ERROR_IMG: errorImg,
  SUCCESS_IMG: successImg,
  WARNING_IMG: warningImg,
};

export function isEmpty(object) {
  return JSON.stringify(object) === "{}";
}

export function calculateTotalPrice(itemPrice, amount, additionsSelected) {
  var additionsCost = 0;
  additionsSelected.map((addition) => {
    additionsCost += addition.price * addition.amountOrdered;
  });

  return roundDecimalHundreds(amount * itemPrice + amount * additionsCost);
}

export function roundDecimalHundreds(decimal) {
  return Math.round((decimal + Number.EPSILON) * 100) / 100;
}

export function getRandomId() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  // //format: 'xxxxxxxx'-'xxxx'-'xxxx'-'xxxx'-'xxxxxxxxxxxx'
  // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

  //format: 'xxxxxxxx'-'xxxx'-'xxxx'-'xxxx'
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4();
}

export function isArraysOfObjectsEqual(arr1, arr2, original) {
  const result = arr1.filter(({ id: id1, amountOrdered: amount1 }) =>
    arr2.some(
      ({ id: id2, amountOrdered: amount2 }) =>
        id1 === id2 && amount1 === amount2
    )
  );

  return result.length === original.length;
}
